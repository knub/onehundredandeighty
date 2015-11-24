.PHONY: test coverage

test:
	@mocha

coverage:
	@istanbul cover _mocha -- -R spec
