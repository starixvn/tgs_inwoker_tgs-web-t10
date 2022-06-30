def componentArray = [];
def componentArrayMerged = [];
def message = "";
pipeline {
	agent any
	environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
        Registry = "registry.gitlab.com/rayprosoft/turnkey-gaming-system/"
        GitUrl = "gitlab.com/inwoker/tgs/tgs-web-t10.git"
        gitlab_user_pwd = credentials('gitlab-user-pwd')
        Image = "lobby-t10"
    }
	
    stages {		    	
        stage('Prepare Env') {
            steps {
                sh "docker login registry.gitlab.com -u ${gitlab_user_pwd_USR} -p ${gitlab_user_pwd_PSW}"
                sh "echo 'Branch: ${env.GIT_BRANCH}'";
                script {
                    switch(env.GIT_BRANCH)
                    {
                        case ['master', 'origin/master']:
                            env.kube_ns = "prod";
                            env.k8s_config = 'stag-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch master";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch master";
                            sh "git config --file=.gitmodules submodule.src/components/api-services.branch master";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        case ['release/current', 'origin/release/current']:
                            env.kube_ns = "staging";
                            env.k8s_config = 'stag-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/components/api-services.branch develop";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        default:
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/api-services.branch develop";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            env.kube_ns = "dev";
                            env.k8s_config = 'k8s-kube-config' 
                            break;
                    }
                    TAG = env.kube_ns + '-' + TAG
					MergedTag = 'merged-' + TAG
                    message += "\nBranch: ${env.GIT_BRANCH}" 
                    message += "\nImage: ${Image}"
                    message += "\nTag: ${TAG}"
                    message += "\nEnv: $env.kube_ns"
                    env.commit_url = "${env.GIT_URL}".replace(".git","/-/commit/") + "${env.GIT_COMMIT}"
                    message += "\n Commit: ${env.commit_url}"
                }

                configFileProvider([configFile(fileId: 'tgs.' + env.kube_ns, variable: 'tgsconfig')]) {
                    script {
                        def envItems = readProperties file: "$tgsconfig";
                        envItems.each { key, value -> 
                            env."tgs_${key}" = value;
                        }
                        componentArray = "${env.tgs_lobby_t10_components}".split(",")
						componentArrayMerged = "${env.tgs_lobby_t10_components_merged}".split(",")
                    }
                }

                sh "echo 'env: $env.kube_ns'"
                sh "echo 'tag: ${TAG}'"
            }
        }	
        stage('Docker Build') {   
            steps {	  			    
                sh "docker build -t ${Registry}${Image}:${TAG} ."
                sh "docker tag ${Registry}${Image}:${TAG} ${Registry}${Image}:$env.kube_ns"
            }
        }			
        stage('Docker Push') {   
            steps {	  
                sh "docker push ${Registry}${Image}:${TAG}"
                sh "docker push ${Registry}${Image}:$env.kube_ns"
            }
        }	
		stage('Docker New Build') {   
            steps {	  			    
                sh "docker build -f Dockerfile-New  -t ${Registry}${Image}:${MergedTag} ."
            }
        }			
        stage('Docker New Push') {   
            steps {	  
                sh "docker push ${Registry}${Image}:${MergedTag}"
            }
        }	
		stage('Deploy') {
            when {
                expression {
                    return env.kube_ns == 'prod';
                }
            }

            steps {
                script {
                    input message: 'Ready to go?', ok: 'yes';
                }
                
                sh "echo start deploy"
            }
        }
        stage('Deployment') {   
            steps {	  
                script {			
                    withKubeConfig([credentialsId: env.k8s_config]) {
                        message += "\nComponent:"
			
						if (env.tgs_lobby_t10_components!="") {
							for (i = 0;i < componentArray.length; i++) {
								message += "\n    ${componentArray[i]}"
								sh "kubectl set image deployment/${componentArray[i]} ${componentArray[i]}=${Registry}${Image}:${TAG} --record -n $env.kube_ns"
							}
						}
						if (env.tgs_lobby_t10_components_merged!="") {
							for (i = 0;i < componentArrayMerged.length; i++) {
								message += "\n    ${componentArrayMerged[i]}"
								sh "kubectl set image deployment/${env.tgs_lobby_t10_deployment_merged} ${componentArrayMerged[i]}=${Registry}${Image}:${MergedTag} --record -n $env.kube_ns"
							}
						}
                    }
                }
            }
        }	
    }
    post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}

def sendTelegram(message) {
    def encodedMessage = URLEncoder.encode(message, "UTF-8")

    withCredentials([string(credentialsId: "telegramToken", variable: "TOKEN"), string(credentialsId: "telegramChatId", variable: "CHAT_ID")]) {

        response = httpRequest (consoleLogResponseBody: true,
                contentType: 'APPLICATION_JSON',
                httpMode: 'GET',
                url: "https://api.telegram.org/bot${TOKEN}/sendMessage?text=${encodedMessage}&chat_id=${CHAT_ID}",
                validResponseCodes: '200')
        return response
    }
}
