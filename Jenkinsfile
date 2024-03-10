pipeline {
    agent {
        label "jenkins-agent"
    }
    environment {
        APP_NAME = "helloworld-nodejs"
        RELEASE = "1.0.0"
        DOCKER_USER = "mtriwardanaa"
        DOCKER_PASS = "dockerhub"
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }
    stages {
        stage("Cleanup Workspace") {
            steps {
                cleanWs()
            }
        }
        stage("Checkout from SCM") {
            steps {
                git branch: 'develop', credentialsId: 'github', url: 'https://github.com/mtriwardanaa/nodejs-jenkins'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                SCANNER_HOME = tool 'sonarqube-scanner-latest';    
            }
            
            steps {
                script {
                    withSonarQubeEnv(credentialsId: 'jenkins-sonarqube-token') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'jenkins-sonarqube-token'
                }
            }
        }
        stage('Build & Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}"
                    }

                    docker.withRegistry('', DOCKER_PASS) {
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push("latest")
                    }
                }
            }
        }
    }
}
