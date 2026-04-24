from django.contrib.auth import get_user_model
from rest_framework import serializers

from inventory.models import Product

User = get_user_model()


class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "full_name",
            "is_active",
            "is_admin",
            "created_at",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "full_name"]
        extra_kwargs = {
            "username": {"validators": []},
            "email": {"validators": []},
        }

    def validate(self, attrs):
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError(
                {"detail": "User with the same username or email already exists"}
            )
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"detail": "User with the same username or email already exists"}
            )
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data, is_active=True, is_admin=False)
        user.set_password(password)
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "sku",
            "category",
            "description",
            "unit",
            "quantity",
            "unit_price",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        extra_kwargs = {
            "name": {"validators": []},
            "sku": {"validators": []},
        }


class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "name",
            "sku",
            "category",
            "description",
            "unit",
            "quantity",
            "unit_price",
            "is_active",
        ]
        extra_kwargs = {
            "name": {"required": False, "validators": []},
            "sku": {"required": False, "validators": []},
            "category": {"required": False},
            "description": {"required": False},
            "unit": {"required": False},
            "quantity": {"required": False},
            "unit_price": {"required": False},
            "is_active": {"required": False},
        }
