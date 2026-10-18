import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { appBinaryForResources } from '../src/resources'

describe('appBinaryForResources', () => {
  it('finds the app in a custom Windows install directory', () => {
    expect(appBinaryForResources(join('D:\\Apps\\Work', 'resources'), 'win32')).toBe(
      join('D:\\Apps\\Work', 'Work.exe'),
    )
  })

  it('resolves the same binary for the default Windows install directory', () => {
    const localAppData = 'C:\\Users\\test\\AppData\\Local'
    const resources = join(localAppData, 'Programs', 'Work', 'resources')
    expect(appBinaryForResources(resources, 'win32')).toBe(
      join(localAppData, 'Programs', 'Work', 'Work.exe'),
    )
  })

  it('finds the app in a custom macOS bundle location', () => {
    expect(
      appBinaryForResources(join('/Volumes/Work/Work.app/Contents/Resources'), 'darwin'),
    ).toBe(join('/Volumes/Work/Work.app/Contents/MacOS/Work'))
  })

  it('finds the app in a custom Linux prefix', () => {
    expect(appBinaryForResources(join('/opt/work-custom/resources'), 'linux')).toBe(
      join('/opt/work-custom/work'),
    )
  })
})
