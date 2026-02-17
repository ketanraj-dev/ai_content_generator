import requests

ACCESS_TOKEN = "AQUdIbJp1yJo4dOcD_Pp7G5LyOvkIM6y68CDbsG5zb_SYt3FE4s_YBUFYZpNxsQfPPkIj7iI-bSirqOHT9-yVtHsok7ASJA7R1jip2P1uaq4viJHA6BkRmOW-1i8p_kewYCjVf9CMQNJcGjpxq1pLDWTV91tkd3Q0keXPET3WWrvHF-vZdC8yy9LG6LxUwVns85Y-aztWgP13JCuZHlOyEEnwfYS0tgS3yIpbaTBqR1Jg0iMrKt7_u0IcTUxWH3dr_NEwhWyOxj4ir-xnG73dd2qhI3IwxMr0ESctGkGYFFWa7QROo4_hglHQmrV8Ylc8AOqQcE7RKuCbyqRhpqMKo3pAmvOfw"

headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "X-Restli-Protocol-Version": "2.0.0"
}

response = requests.get(
    "https://api.linkedin.com/v2/userinfo",
    headers=headers
)

print(response.json())
