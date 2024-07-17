# Deploying the APP

Build the frontend code

```bash
cd fe && npm run build:prod && cd ../
```

Run the following command locally to build the image:

```bash
export TAG=v1.1.0
docker build -t cafin:$TAG . --platform=linux/amd64
```

Next, test running the container locally

```bash
docker run -p 80:3000 --env DATABASE_URL=$DATABASE_URL cafin:$TAGdocker run -p 80:3000 --env DATABASE_URL=$DATABASE_URL cafin:$TAG
```

Next, run the following command to save the image in a `.tar` file:

```bash
docker save cafin:$TAG > cafin-$TAG.tar
```

Next, push the image to the server:

```bash
sudo rsync -P -a cafin-$TAG.tar <USER>@<SERVER_IP>:<PATH>
```

Next, make sure to get the `.tar` file in the server and run the command:

```bash
docker load < cafin-$TAG.tar
```

Then, run the following command to start the container

```bash
docker run -d --network=host --restart=unless-stopped --env PORT=80 --env DATABASE_URL=$DATABASE_URL cafin:$TAG
```
