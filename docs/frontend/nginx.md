# Nginx

## 开启 gzip

```conf
http {
  # 开启GZIP
  gzip on;
  # gzip 压缩级别 1-10
  gzip_comp_level 2;
  # 启用gzip压缩的最小文件；小于设置值的文件将不会被压缩
  gzip_min_length 1k;
  # 进行压缩的文件类型。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;
}
```

## 开启 http2

```conf
server {
  listen 443 ssl http2;

  ssl_certificate /path/to/ssl/certificate.pem;
  ssl_certificate_key /path/to/ssl/private/key.pem;
  ssl_protocals TLSv1.3;
}
```

## 缓存 动静分离

动静分离，nginx 做静态资源，nginx 反响代理，负载均衡做动态数据

```conf
# 负载均衡，上位服务器
upstream node.com {
    server 127.0.0.1: 3000
    server 127.0.0.1: 3001
}
server {
    #静态资源
    root /root/static/
    #动态接口
    location ~ /dynamic/path/(\d*) {
        proxy_pass http://node.com/detail?id=$1
        proxy_cache #缓存反向代理
    }
}
```

## nginx 对不同域名的配置

```conf
server {
    # 博客页面
    server_name  blog.fstars.wang;
    location / {
        proxy_pass   http://localhost:3000;
        proxy_cache
    }
}
server {
    # 图片等资源
    server_name  static.fstars.wang;
    location / {
        root   /www/static/;
    }
}
```
