FROM node:14.2.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/package.json
ADD src/* /usr/src/app/

RUN npm install

# start app
CMD ["node", "app/app.js"]
