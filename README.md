# networkcontainertesting
This is a simple way to test connectivity in and out of  a Docker container

## Background

I had a problem: I needed to have a simple app to deploy as a container that I could use to test and see if my containers, either standalone or within a Kubernetes pod, had outside connectivity to the Internet. To do that, I wrote a simple node.js application that uses  express, some HTML and jQuery. The node.js app either responds directly to the user or it routes the request to the HTML. The HTML use simple javascript to call the API and process the returned Json and then display it using jQuery.

## Assumptions

##### You have the following on your machine
1. git
2. Docker
3. npm
4. node

## How to use

1. Get a command prompt and go to a directory you can download this repository (e.g. /temp)
2. Clone the repo into this directory with this command: git clone https://github.com/blm849/networkcontainertesting
3. Enter: cd networkcontainertesting
4. Enter: npm install

You are now ready to start testing.

### To test it as a node.js app running locally on your machine:

1. Enter: node app.js
2. In your browser, enter: http://localhost:8080
3. In your browser, enter: http://localhost:8080/hello
4. In your browser, enter: http://localhost:8080/random
5. From the window you entered node app.js, enter: ctrl+```

### To test it in a Docker container

1. Build your docker image. Enter: docker build -t networkcontainertesting .
2. Check your image is running. Enter: docker images
3. Create a container with your image. Enter: docker run --name networkcontainertesting -p 80:8080 -d networkcontainertesting
4. In your browser, enter: http://localhost
5. In your browser, enter: http://localhost/hello
6. In your browser, enter: http://localhost/random
7. If you have any problems, see if it is running. Enter: docker ps
8. Now stop the container. Get the container id by running: docker ps
9. You can stop it by entering: _docker stop ID_ where ID is either the container id or the name of the container (i.e.networkcontainertesting)

### To test it in an IBM Kubernetes cluster

Assuming you have a cluster running already, and you have the ibmcloud command on your machine,  do the following:
1. Login. Enter: ibmcloud login
2. Assuming your cluster is running in US South, enter: ibmcloud target -r  us-south (Washington and Toronto are in us-east)
3. Check your cluster is available. Enter: ibmcloud cs clusters
Mine is called cloudnativedev.
4. Enter: ibmcloud ks cluster-config cloudnativedev
5. Run the export command that comes back.
6. Login to the container registry. Enter: sudo ibmcloud cr login
7. Get a list of your namespaces. Enter: sudo ibmcloud cr namespace-list
8. Build your image using the information that came back. Enter: sudo ibmcloud cr build -t registry.ng.bluemix.net/blm849namespace/hello-world:1 .
Note the ".ng." in the URL. That refers to US South. Also try and use a unique tag. I am using "1" here but if you use the same tag over and over again, you may have issues with your deployment not being updated.
9. Deploy the app to a single pod with the name hello-world-deployment
. Enter: kubectl run hello-world-deployment --image=registry.ng.bluemix.net/blm849namespace/hello-world:1
10. Make the app available to the world. Enter: kubectl expose deployment/hello-world-deployment --type=NodePort --port=8080 --name=hello-world-service --target-port=8080
11. Determine what the nodeport is. Enter:
kubectl describe service hello-world-service
12. Determine the public facing IP of node. Enter: ibmcloud ks workers --cluster cloudnativedev
13. Combine the public IP and nodeport to call your app. Enter in your browser, enter: http://public_IP:nodeport and then enter: http://public_IP:nodeport/hello and then enter: http://public_IP:nodeport/random
14. If you want to discontinue your application from running, enter:
- kubectl delete deployment/hello-world-deployment
- kubectl delete service/hello-world-service
- sudo ibmcloud cr image-rm blm849namespace/hello-world:1



## Files

This repo consists of the following files and directories:

- app.js: the main node.js code
- Dockerfile: the file used to build a container to run app.js in
- package.json: a list of the dependencies associated with app.js
- views: this directory consists of HTML and simple javascript files.
The HTML calls the javascript of the same name, the javascript calls an
external API, gets the results, and rewrites the HTML with the results of the API call. There is a hello.html and .js file and a random.html and js file.
- Dockerignore: when working with Docker, rename this file to .Dockerignore
- README.md: this files
- other files: LICENCE is the licence file for the repo, and .gitignore prevents some files from not being upload.

## References

The instructions in this README were partially derived from:
1. Docker: https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
2. IBM. https://cloud.ibm.com/docs/containers?topic=containers-cs_cluster_tutorial#cs_cluster_tutorial to create a cluster and https://cloud.ibm.com/docs/containers?topic=containers-cs_apps_tutorial#cs_apps_tutorial to deploy an app into your cluster.
