# Prerequisites

Before running the application, make sure you have the following dependencies installed:

- Node.js
- NestJS CLI
- Docker
- Docker Compose

## Getting Started

To set up the development environment, follow these steps:

1. Clone this repository:

  ```bash
  git clone https://github.com/your-username/interview-challenge.git
  ```
2. Navigate to the project directory:
  ```bash
  cd app
  ```

3. Start the development environment:
  ```bash
  docker-compose up -d --build
  ```
4. Access the API documentation:
Open your browser and visit http://localhost:3000/api to view the Swagger documentation for the API.

## Codebase
The code follows NestJS conventions and best practices, with each path represented as a directory in the app/src folder. Later on, organizing the code into app/src/modules can improve better maintainability as there may be other directory (e.g `common`, `utils`, `middleware`).
### Codebase improvement
- Version of the application (`/` root endpoint) is getting from the commit sha but it can be improved to read from tag.
- Middleware to count requests per path

## CI pipeline
- Github action to run unit test, lint, build, and push the container image to Dockerhub.
- Github action to package the helm chart using https://github.com/helm/chart-releaser-action

## Helm chart
- Templates include `deployment`, `service`, and `serviceaccount`. Ingress isn't included but will be considered if knowing which ingress controller is used.
- MONGODB_CONNECTION_STRING variable is read from `app-secret`. Which can be generated using below script
```bash
#!/bin/bash

# Prompt for the mongodb_url value
read -p "Enter the value for mongodb_url: " mongodb_url_value

# Encode the mongodb_url value as base64
mongodb_url_base64=$(echo -n "$mongodb_url_value" | base64)

# Generate the YAML file
cat <<EOF > secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
data:
  mongodb_url: $mongodb_url_base64
EOF

echo "Secret YAML file 'secret.yaml' generated successfully!"
```

- To install the Helm chart app
1. Clone this repository:

  ```bash
  helm repo add myrepo https://maiquanghiep.github.io/solid-solid
  ```
2. Navigate to the project directory:
  ```bash
  helm repo update
  ```

3. Start the development environment:
  ```bash
  helm install myapp myrepo/app --values ./helm/app/values.yaml
  ```

 ### Devops improvement
 - Continuous deployment (CD) hasn't been considered so the Helm value image.tag need to be updated manually. Simple CD can be added directly to the pipeline to install helm, access to k8s for the runner and, run `helm upgrade --install app . --set image.tag=${{ github.sha }}`. Alternatively, ArgoCD (https://argo-cd.readthedocs.io/en/stable/) with https://argocd-image-updater.readthedocs.io/en/stable/ can be used. 
- As Ingress isn't considered,`port-forward` is required to test the application for now.
  ```bash
  kubectl port-forward [pod-name] 3000:3000
  ```