MOCHA_OPTS= --check-leaks
REPORTER = dot
	
test: test-unit test-integration test-acceptance

test-unit:
	@.\node_modules\.bin\mocha --reporter $(REPORTER) $(MOCHA_OPTS)

test-integration:
	@.\node_modules\.bin\mocha --reporter $(REPORTER) --bail test/integration/*.js
	
test-acceptance:
	@.\node_modules\.bin\mocha --reporter $(REPORTER) --bail test/acceptance/*.js

.PHONY: test test-unit test-integration test-acceptance 