
=================================================================
#
# WARNING: Read https://github.com/maxogden/art-of-node#callbacks
#   before writing any code for Node.js ;)
=================================================================
TODO:
   * read CORS with nodejs 
      https://github.com/visionmedia/express/blob/master/examples/cors/index.js

   * read setting headers
      https://stackoverflow.com/questions/7042340/node-js-error-cant-set-headers-after-they-are-sent

   * Redirecting requests to port 80 to port 3000
      # localhost/loopback
      sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 3000

      # external
      sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

==== STEPS

# Create app folder

mkdir api
cd api


# Add files
touch index.js
ln -s index.js app.js


# Create extra folder
mkdir public
mkdir public/javascripts
mkdir public/images
mkdir public/stylesheets
touch public/stylesheets/css.css

# Add folders to store code responding to different request types
mkdir modules 


# Add files to force passenger to always restart
mkdir tmp
touch tmp/always_restart.txt
touch tmp/restart.txt  
