from django.contrib.auth.base_user import BaseUserManager


class AccountManager(BaseUserManager):

    def get(self, *args, **kwargs):
        obj = self.filter(*args, **kwargs).first()
        if not obj:
            raise ValueError('Account not found')
        return obj

    def create_superuser(self, email, password, **kwargs):
        obj = self.model.objects.filter(is_admin=True)
        if obj.count() > 0:
            raise ValueError('There is already an administrator')

        kwargs['is_admin'] = True
        email = self.normalize_email(email)

        account = self.model(email=email, **kwargs)
        account.set_password(password)
        account.save()
        return account

    def edit(self, pk, email, password):
        obj = self.model.objects.get(pk=pk)
        if password:
            obj.set_password(password)
        if email:
            obj.email = self.normalize_email(email)

        obj.save()

        return obj
