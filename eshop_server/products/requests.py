from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.views import APIView

from globals.decorators import check_shop
from globals.pagination import pagination
from globals.response import custom_response
from product_categories.models import Category
from product_categories.serializers import CategorySerializer
from products.models import Product, Specs, Images
from products.serializer import ProductSerializer, SpecsSerializer, ImagesSerializer


class GetOrCreate(APIView):
    def get(self, request):
        try:
            sort_by_options = [
                {'id': 1, 'name': 'Latest'},
                {'id': 2, 'name': 'Price Ascending'},
                {'id': 3, 'name': 'Price Descending'},
            ]
            data = {}
            active = request.GET.get('active')
            category = request.GET.get('category')
            sort_by = request.GET.get('sort_by')
            # Check for shop
            shop = request.GET.get('shop')
            override_limit = int(request.GET.get('limit')) if request.GET.get('limit') else 0
            check_shop(shop)

            data['shop'] = shop

            if active:
                data['active'] = bool(active)

            if category:
                data['category__category__pk'] = int(category)

            order_by = '-modified'

            if sort_by:
                if int(sort_by) == 1:
                    order_by = '-modified'

                if int(sort_by) == 2:
                    order_by = 'price'

                if int(sort_by) == 3:
                    order_by = '-price'

            model = Product.objects.filter(**data).order_by(order_by)
            objs, pagination_data = pagination(
                model=model,
                page=request.GET.get('page') or 1,
                admin=request.GET.get('admin') or False,
                override_limit=override_limit
            )

            categories_options = Category.objects.filter(shop=shop).order_by('name')

            return custom_response(
                message="products fetched",
                status=status.HTTP_200_OK,
                data=ProductSerializer(objs, many=True).data,
                sort_by_options=sort_by_options,
                categories_options=CategorySerializer(categories_options, many=True).data,
                pagination=pagination_data,
                filters={
                    "category": category,
                    "sort_by": sort_by
                }
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request, *args, **kwargs):
        try:
            product = Product.objects.create(**request.data)

            return custom_response(
                message='Product created',
                data=ProductSerializer(product).data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetEditOrRemove(APIView):
    def get(self, request, **kwargs):
        try:
            active = request.GET.get('active')
            # Check for shop
            shop = request.GET.get('shop')
            check_shop(shop)

            if active:
                obj = Product.objects.get(pk=kwargs['pk'], active=bool(active), shop=shop)
            else:
                obj = Product.objects.get(pk=kwargs['pk'], shop=shop)

            return custom_response(
                message='Product fetched',
                data=ProductSerializer(obj).data,
                status=status.HTTP_200_OK
            )

        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request, **kwargs):
        try:
            product = Product.objects.edit(pk=kwargs['pk'], **request.data)

            return custom_response(
                message='Product edited',
                status=status.HTTP_200_OK,
                data=ProductSerializer(product).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, **kwargs):
        try:
            product = Product.objects.delete(pk=kwargs['pk'])

            return custom_response(
                message='Product removed successfully',
                status=status.HTTP_204_NO_CONTENT,
                data=ProductSerializer(product).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class ActivateOrDeactivateProduct(APIView):
    def put(self, request, **kwargs):
        try:
            product = Product.objects.get(pk=kwargs['pk'])
            product.active = not product.active
            obj = ProductSerializer(product).data
            # Category
            if not obj['category']:
                raise ValueError('Category is required')
            # Descriptions
            if not obj['description_short']:
                raise ValueError('Description short is required')

            if not obj['description_long']:
                raise ValueError('Description long is required')
            # One image
            if len(obj['images']) < 1:
                raise ValueError('At least an image is required')

            product.save()

            return custom_response(
                message=f'Product {"Activated" if product.active else "Deactivated"}',
                status=status.HTTP_202_ACCEPTED,
                data=ProductSerializer(product).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class CreateOrEditImage(APIView):
    def put(self, request, **kwargs):
        try:
            Product.objects.get(pk=kwargs['pk'])
            objs = Images.objects.bulk_edit_index(product=kwargs['pk'], images=request.data.get('images'))

            return custom_response(
                message='Images updated',
                status=status.HTTP_202_ACCEPTED,
                data=ImagesSerializer(objs, many=True).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

    def post(self, request, **kwargs):
        try:
            product = Product.objects.get(pk=kwargs['pk'])
            images = request.FILES.getlist('path')

            for image in images:
                data = {
                    'path': image,
                    'product': product
                }
                Images.objects.create(**data)

            return custom_response(
                message='Image created',
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class RemoveImage(APIView):
    def delete(self, request, **kwargs):
        try:
            Product.objects.get(pk=kwargs['pk'])
            image = Images.objects.get(pk=kwargs['image_pk'])
            image.delete()

            return custom_response(
                message='Image deleted',
                status=status.HTTP_204_NO_CONTENT,
                data=ImagesSerializer(image).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class CreateOrEditSpecs(APIView):
    def post(self, request, **kwargs):
        try:
            data = request.data
            data['product'] = Product.objects.get(pk=kwargs['pk'])
            spec = Specs.objects.create(**request.data)

            return custom_response(
                message='Spec created',
                status=status.HTTP_201_CREATED,
                data=SpecsSerializer(spec).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request, **kwargs):
        try:
            Product.objects.get(pk=kwargs['pk'])
            objs = Specs.objects.bulk_edit_index(product=kwargs['pk'], specs=request.data.get('specs'))

            return custom_response(
                message='Specs updated',
                status=status.HTTP_202_ACCEPTED,
                data=SpecsSerializer(objs, many=True).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class EditOrRemoveSpecs(APIView):
    def put(self, request, **kwargs):
        try:
            # Check for product
            Product.objects.get(pk=kwargs['pk'])
            spec = Specs.objects.edit(pk=kwargs['spec_pk'], **request.data)

            return custom_response(
                message='Spec updated',
                status=status.HTTP_200_OK,
                data=SpecsSerializer(spec).data
            )

        except Exception as e:
            return custom_response(
                message=e,
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, **kwargs):
        try:
            # Check for product
            Product.objects.get(pk=kwargs['pk'])
            spec = Specs.objects.get(pk=kwargs['spec_pk'])
            spec.delete()

            return custom_response(
                message='Spec deleted',
                status=status.HTTP_204_NO_CONTENT,
                data=SpecsSerializer(spec).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )
