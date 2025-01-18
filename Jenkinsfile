pipeline {
    agent any

    environment {
        NODE_HOME = '/usr/local/node'
        NPM_HOME = '/usr/local/npm'
        EC2_HOST = '122.160.157.99'      // EC2 public IP address or hostname
        EC2_USER = 'djangoboy'   
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

    stage('Transfer Build Folder to Target Repo') {
        steps {
            script {
                // Clone the target repository
                sh 'rm -rf addchat-client-cdn-files'
                sh 'git clone git@github.com:codekeep18feb/addchat-client-cdn-files.git addchat-client-cdn-files'
                sh 'rm -rf addchat-client-cdn-files/dist'
                sh 'mv dist/* addchat-client-cdn-files/'

                dir('addchat-client-cdn-files') {
                    // Set Git user config
                    sh 'git config --global user.email "codekeep18feb@gmail.com"'
                    sh 'git config --global user.name "codekeep18feb"'

                    // Add and commit the new changes
                    sh 'git add .'
                    sh 'git commit -m "Deploy build folder to target repo" || echo "No changes to commit"'

                    // Use single quotes for the shell command to avoid Groovy string interpolation issues
                    def lastTag = sh(
                        script: 'git describe --tags $(git rev-list --tags --max-count=1)',
                        returnStdout: true
                    ).trim()

                    def versionParts = lastTag.replace('v', '').split('\\.')
                    int major = versionParts[0] as int
                    int minor = versionParts[1] as int
                    int patch = versionParts[2] as int

                    patch++
                    if (patch > 9) {
                        patch = 0
                        minor++
                    }

                    def newTag = "v${major}.${minor}.${patch}"

                    echo "Creating and pushing new tag: ${newTag}"

                    sh "git tag ${newTag}"
                    sh "git push origin ${newTag}"
                }
            }
        }
    }


    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
