@Library('global-shared-library') _
def componentArray = [];
def message = "";
pipeline {
	agent any
	environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
        Registry = "pgtgs/"
        GitUrl = "gitlab.com/inwoker/tgs/tgs-web-t10.git"
        dockerhub = credentials('dockerhub')
        Image = "lobby-t10"
    }
	
    stages {		    	
        stage('Prepare Env') {
            steps {
                sh "docker login -u ${dockerhub_USR} -p ${dockerhub_PSW}"
                sh "echo 'Branch: ${env.GIT_BRANCH}'";
                script {
                    switch(env.GIT_BRANCH)
                    {
                        case ['master', 'origin/master']:
                            env.kube_ns = "prod";
                            env.k8s_config = 'prod-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch master";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch master";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch master";
                            sh "git config --file=.gitmodules submodule.src/components/Common.branch master";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        case ['28win_prod']:
                            env.kube_ns = "prod";
                            env.k8s_config = 'prod-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch 28win_prod";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch master";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch master";
                            sh "git config --file=.gitmodules submodule.src/components/Common.branch master";

                            sh "git config --file=.gitmodules submodule.src/components/Common.branch master";

                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        case ['release/current', 'origin/release/current']:
                            env.kube_ns = "staging";
                            env.k8s_config = 'stag-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/Common.branch release/current";

                            sh "git config --file=.gitmodules submodule.src/components/Common.branch release/current";

                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        case ['28win']:
                            env.kube_ns = "staging";
                            env.k8s_config = 'stag-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch win28";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/Common.branch develop";

                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        default:
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch develop";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/Common.branch develop";

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
     
        stage('Deploy to master') {   
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
