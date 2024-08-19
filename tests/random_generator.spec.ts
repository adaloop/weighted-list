import { test } from '@japa/runner'
import { FakeRandomGenerator, MathRandomGenerator } from '../src/random_generator.js'

test.group('RandomGenerator', () => {
  test('should generate a number between min and max', ({ assert }) => {
    const randomGenerator = new MathRandomGenerator()

    const random = randomGenerator.generate(0, 100)

    assert.isNumber(random)
    assert.isAtLeast(random, 0)
    assert.isAtMost(random, 100)
  })

  test('should generate a defined number', ({ assert }) => {
    const randomGenerator = new FakeRandomGenerator(20)

    const random = randomGenerator.generate()

    assert.equal(random, 20)
  })
})
