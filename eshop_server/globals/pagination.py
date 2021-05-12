import json

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


def pagination(model, page=1, admin=False, override_limit=0):
    file = open('config/file.json')
    obj = json.load(file)

    limit = obj['pagination']['items_admin'] if admin else obj['pagination']['items_store']

    if override_limit != 0:
        limit = override_limit

    paginator = Paginator(model, limit)

    try:
        objs = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer deliver the first page
        objs = paginator.page(1)
    except EmptyPage:
        # If page is out of range deliver last page of results
        objs = paginator.page(paginator.num_pages)

    current_page = int(page) if int(page) <= paginator.num_pages else paginator.num_pages
    total = model.count()

    low_range, high_range = pagination_range(current_page, limit, objs)

    pagination_data = {
        "limit": limit,
        "current_page": current_page,
        "total_pages": paginator.num_pages,
        "total_items": total,
        "range": {
            "low": low_range,
            "high": high_range
        }
    }

    return objs, pagination_data


def pagination_range(page, limit, items):
    low_range = page * limit - limit + 1
    high_range = low_range + items.object_list.count() - 1
    return low_range, high_range
