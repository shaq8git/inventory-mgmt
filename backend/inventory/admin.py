from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from inventory.models import Product, User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = DjangoUserAdmin.fieldsets + (
        ("Inventory", {"fields": ("full_name", "is_admin", "created_at")}),
    )
    readonly_fields = ("created_at",)
    list_display = ("username", "email", "is_active", "is_admin", "created_at")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "sku", "category", "quantity", "unit_price", "is_active")
    search_fields = ("name", "sku", "category")
