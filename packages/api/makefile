appsync:
	@yarn build
	@echo "\n\n🚀 Deploying Core AppSync API to development!\n"
	@cd resources/appsync; \
	sls deploy

dynamodb:
	@echo "\n\n🚀 Deploying API's DynamoDB Table to development!\n"
	@cd resources/dynamodb; \
	sls deploy

api:
	@make appsync
	@make _api

cognito:
	@echo "\n\n🚀 Deploying Cognito User and Identity Pool to development!\n"
	@cd resources/cognito; \
	sls deploy

# WARNING: DO NOT EXECUTE. This re-deploys ALL resources, it is not what you want. Deploy individually instead.
_all:
	@make cognito
	@make appsync
	@make dynamodb
	@make _api
	@echo "\n\n🍻 Success!"


appsync-prod:
	@yarn build
	@echo "\n\n\🚀 Deploying Core AppSync API to:\nPRODUCTION\n"
	@cd resources/appsync; \
	sls deploy --stage prod

dynamodb-prod:
	@echo "\n\n🚀 Deploying API's DynamoDB Table to:\nPRODUCTION!\n"
	@cd resources/dynamodb
	sls deploy --stage prod; \

_api:
	@yarn build
	@echo "\n\n🚀 API to development!\n"
	@sls deploy

_api-prod:
	@yarn build
	@echo "\n\n🚀 API to:\nPRODUCTION!\n"
	@sls deploy --stage prod	
	
api-prod:
	@make appsync-prod
	@make _api-prod

cognito-prod:
	@echo "\n\n🚀 Deploying Cognito User and Identity Pool to:\nPRODUCTION!\n"
	@cd resources/cognito; \
	sls deploy --stage prod

# STRONG WARNING: DO NOT EXECUTE. This replaces EVERYTHING in production, it is not what you want. Deploy individually instead.
_all-prod:
	@make cognito-prod
	@make appsync-prod
	@make dynamodb-prod
	@make _api-prod
	@echo "\n\n🍻 Success!"

.PHONY: list
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'