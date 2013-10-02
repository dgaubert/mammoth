test: test-unit test-integration test-acceptance

test-unit:
	@./node_modules/.bin/mocha --check-leaks 

test-integration:
	@./node_modules/.bin/mocha --bail test/integration/*.js
	
test-acceptance:
	@./node_modules/.bin/mocha --bail test/acceptance/*.js

.PHONY: test test-unit test-integration test-acceptance 