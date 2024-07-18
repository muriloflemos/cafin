FROM node:18-alpine as install
WORKDIR /usr/src/app
COPY ./api/ .
RUN npm ci --unsafe-perm

FROM install as build
RUN npx prisma generate
RUN npm run build

# FROM node:alpine as fe-install
# WORKDIR /usr/src/app
# COPY ./fe /usr/src/app
# RUN npm install -g @angular/cli
# RUN npm install

# FROM fe-install as fe-build
# RUN npm run build

FROM node:18-alpine as production

COPY --from=build /usr/src/app/node_modules/ ./node_modules/
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/dist ./dist

COPY ./fe/dist ./dist/fe
# COPY --from=fe-build /usr/src/app/dist ./dist/fe

CMD ["node", "dist/main.js"]
EXPOSE 3000