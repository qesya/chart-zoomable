import getData from './service'

it('returns the correct format', () => {
  return getData().then(([data]) => {
    expect(typeof data.volume).toBe('number')
    expect(typeof data.date).toBe('string')
    expect(typeof data.price_usd).toBe('number')
    expect(typeof data.volume_usd).toBe('number')
  })
})
