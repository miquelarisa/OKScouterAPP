# Fase install
FROM node:16 AS installer

WORKDIR /app

COPY ["./package.json","./yarn.lock", "./"]

RUN yarn install --frozen-lockfile

# Fase build
FROM node:16 AS builder

WORKDIR /app

COPY . ./
COPY --from=installer /app/node_modules ./node_modules

RUN yarn build
RUN mkdir prod
RUN npm install -g @mapbox/node-pre-gyp
RUN yarn install --production --modules-folder ./prod

# Fase runner
FROM node:16 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXTAUTH_URL=https://oks.azurewebsites.net
ENV NEXTAUTH_SECRET=sGm6YC20Zrke4JFsgtiFoDVDbQZQ/6GW0Mvd4j/Irl0=
ENV URL_PAGE=https://oks.azurewebsites.net

#ENV NEXTAUTH_URL=http://localhost:3000/api/auth
#ENV URL_PAGE=http://localhost:3000

COPY --from=builder /app/prod ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/components ./components
COPY --from=builder /app/config ./config
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/public ./public
COPY --from=builder /app/sources ./sources
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/*.* ./

EXPOSE 3000

USER node
#CMD [ "yarn", "dev" ]
CMD [ "yarn", "start" ]
