from datetime import datetime

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from jose import jwt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from inventory.models import Product
from inventory.serializers import (
    ForgotPasswordSerializer,
    ProductSerializer,
    ProductUpdateSerializer,
    UserCreateSerializer,
    UserLoginSerializer,
    UserResponseSerializer,
)

User = get_user_model()


def create_access_token(username):
    expire = datetime.utcnow() + settings.ACCESS_TOKEN_LIFETIME
    payload = {"sub": username, "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = authenticate(
        request,
        username=serializer.validated_data["username"],
        password=serializer.validated_data["password"],
    )

    if not user:
        return Response(
            {"detail": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.is_active:
        return Response(
            {"detail": "User account is inactive"},
            status=status.HTTP_403_FORBIDDEN,
        )

    token = create_access_token(user.username)
    return Response(
        {
            "access_token": token,
            "user": UserResponseSerializer(user).data,
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def forgot_password(request):
    serializer = ForgotPasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({"message": "If the email exists, a reset link has been sent."})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def users(request):
    if request.method == "GET":
        queryset = User.objects.order_by("-created_at")
        return Response(UserResponseSerializer(queryset, many=True).data)

    serializer = UserCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(
        UserResponseSerializer(user).data,
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def user_detail(_request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response(UserResponseSerializer(user).data)


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def products(request):
    if request.method == "GET":
        queryset = Product.objects.all()
        return Response(ProductSerializer(queryset, many=True).data)

    serializer = ProductSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    if Product.objects.filter(name=serializer.validated_data["name"]).exists() or Product.objects.filter(
        sku=serializer.validated_data["sku"]
    ).exists():
        return Response(
            {"detail": "Product with the same name or SKU already exists"},
            status=status.HTTP_409_CONFLICT,
        )

    product = serializer.save()
    return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([AllowAny])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response(
            {"detail": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        return Response(ProductSerializer(product).data)

    if request.method == "PUT":
        serializer = ProductUpdateSerializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updates = serializer.validated_data

        if "name" in updates and Product.objects.exclude(pk=product.pk).filter(name=updates["name"]).exists():
            return Response(
                {"detail": "Product with the same name or SKU already exists"},
                status=status.HTTP_409_CONFLICT,
            )

        if "sku" in updates and Product.objects.exclude(pk=product.pk).filter(sku=updates["sku"]).exists():
            return Response(
                {"detail": "Product with the same name or SKU already exists"},
                status=status.HTTP_409_CONFLICT,
            )

        product = serializer.save()
        return Response(ProductSerializer(product).data)

    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def transactions(request):
    if request.method == "GET":
        return Response({"message": "List transactions endpoint"})
    return Response({"message": "Create transaction endpoint"})
