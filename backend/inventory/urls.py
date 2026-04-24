from django.urls import path

from inventory import views

urlpatterns = [
    path("auth/login", views.login),
    path("auth/forgot-password", views.forgot_password),
    path("users/", views.users),
    path("users/<int:user_id>", views.user_detail),
    path("products/", views.products),
    path("products/<int:product_id>", views.product_detail),
    path("transactions/", views.transactions),
]
