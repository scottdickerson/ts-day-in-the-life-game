#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Scene Image Discrepancy Checker
 *
 * This script validates that all story codes marked as exported in JSON files
 * have corresponding scene images in their respective folders.
 */

const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const DATA_DIR = path.join(PUBLIC_DIR, 'data')

interface DinosaurConfig {
    name: string
    jsonFile: string
    sceneFolder: string
    exportedField: string
}

interface StoryEntry {
    'Code ID': string
    Content?: string
    'env label'?: string
    exported?: string | boolean
    exportedForReview?: string | boolean
    [key: string]: any
}

interface MissingImage {
    codeId: string
    content?: string
    environment: string
}

interface CheckResult {
    name: string
    totalExported: number
    totalAvailable: number
    missingImages: MissingImage[]
    missingCount: number
}

// Mapping of dinosaur types to their file and folder names
const DINOSAUR_CONFIGS: DinosaurConfig[] = [
    {
        name: 'Agujaceratops',
        jsonFile: 'Agujaceratops.json',
        sceneFolder: 'AgujaScenes',
        exportedField: 'exported',
    },
    {
        name: 'Kritosaurus',
        jsonFile: 'Kritosaurus.json',
        sceneFolder: 'KritoScenes',
        exportedField: 'exported',
    },
    {
        name: 'Tyrannosaurus',
        jsonFile: 'Tyrannosaurus.json',
        sceneFolder: 'TyrannoScenes',
        exportedField: 'exported',
    },
    {
        name: 'Mosasaurus',
        jsonFile: 'Mosasaurus.json',
        sceneFolder: 'MosaScenes',
        exportedField: 'exportedForReview',
    },
    {
        name: 'Protohadros',
        jsonFile: 'Protes.json',
        sceneFolder: 'ProtosScenes',
        exportedField: 'exportedForReview',
    },
]

/**
 * Check if a story code should have a scene image
 */
function shouldHaveSceneImage(
    storyEntry: StoryEntry,
    exportedField: string
): boolean {
    const codeId = storyEntry['Code ID']
    const exportedValue = storyEntry[exportedField as keyof StoryEntry]

    // Skip entries without code IDs, empty code IDs, or conclusion entries (with 6 suffix)
    if (!codeId || codeId === '' || codeId.endsWith('_6')) {
        return false
    }

    // Check if marked as exported/ready for review
    return exportedValue === 'TRUE' || exportedValue === true
}

/**
 * Get list of available scene images for a dinosaur
 */
function getAvailableSceneImages(sceneFolder: string): Set<string> {
    const scenePath = path.join(PUBLIC_DIR, sceneFolder)
    const images = new Set<string>()

    try {
        const files = fs.readdirSync(scenePath)
        files.forEach((file) => {
            if (file.endsWith('.png')) {
                images.add(file.replace('.png', ''))
            }
        })
    } catch (error) {
        console.error(
            chalk.red(
                `❌ Error reading scene folder ${sceneFolder}: ${(error as Error).message}`
            )
        )
    }

    return images
}

/**
 * Load and parse dinosaur story data
 */
function loadStoryData(jsonFile: string): StoryEntry[] {
    const filePath = path.join(DATA_DIR, jsonFile)

    try {
        const data = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(data) as StoryEntry[]
    } catch (error) {
        console.error(
            chalk.red(
                `❌ Error reading ${jsonFile}: ${(error as Error).message}`
            )
        )
        return []
    }
}

/**
 * Check scene images for a single dinosaur
 */
function checkDinosaurScenes(config: DinosaurConfig): CheckResult {
    const { name, jsonFile, sceneFolder, exportedField } = config

    console.log(chalk.blue(`\n🦕 Checking ${name}...`))

    const storyData = loadStoryData(jsonFile)
    const availableImages = getAvailableSceneImages(sceneFolder)

    const missingImages: MissingImage[] = []
    const exportedScenes: string[] = []

    storyData.forEach((entry) => {
        if (shouldHaveSceneImage(entry, exportedField)) {
            const codeId = entry['Code ID']
            exportedScenes.push(codeId)

            if (!availableImages.has(codeId)) {
                missingImages.push({
                    codeId,
                    content: entry.Content?.substring(0, 100) + '...',
                    environment: entry['env label'] || 'Unknown',
                })
            }
        }
    })

    return {
        name,
        totalExported: exportedScenes.length,
        totalAvailable: availableImages.size,
        missingImages,
        missingCount: missingImages.length,
    }
}

/**
 * Generate a detailed report of missing scene images
 */
function generateReport(results: CheckResult[]): boolean {
    console.log(chalk.cyan('\n📊 SCENE IMAGE ANALYSIS REPORT'))
    console.log(chalk.cyan('=====================================\n'))

    let totalMissing = 0
    let hasErrors = false

    results.forEach((result) => {
        const {
            name,
            totalExported,
            totalAvailable,
            missingImages,
            missingCount,
        } = result

        if (missingCount === 0) {
            console.log(
                chalk.green(
                    `✅ ${name}: Complete (${totalAvailable} images available)`
                )
            )
        } else {
            hasErrors = true
            totalMissing += missingCount
            console.log(chalk.red(`❌ ${name}: ${missingCount} missing images`))
            console.log(
                chalk.gray(
                    `   📈 ${totalExported} exported scenes, ${totalAvailable} images available`
                )
            )

            if (missingCount <= 10) {
                // Show details for manageable lists
                missingImages.forEach((missing) => {
                    console.log(
                        chalk.yellow(`   📸 Missing: ${missing.codeId}.png`)
                    )
                    console.log(
                        chalk.gray(`      Environment: ${missing.environment}`)
                    )
                    if (missing.content && missing.content !== 'undefined...') {
                        console.log(
                            chalk.gray(`      Story: ${missing.content}`)
                        )
                    }
                })
            } else {
                // Summarize for large lists
                console.log(
                    chalk.yellow(`   📸 Missing images (first 5 shown):`)
                )
                missingImages.slice(0, 5).forEach((missing) => {
                    console.log(chalk.yellow(`      - ${missing.codeId}.png`))
                })
                console.log(
                    chalk.gray(`      ... and ${missingCount - 5} more`)
                )
            }
        }
        console.log('')
    })

    // Summary
    console.log(chalk.cyan('📋 SUMMARY'))
    console.log(chalk.cyan('==========='))
    if (hasErrors) {
        console.log(chalk.red(`❌ Total missing scene images: ${totalMissing}`))
        console.log(chalk.yellow('\n💡 Action required:'))
        console.log(
            chalk.gray('   1. Create the missing scene images listed above')
        )
        console.log(
            chalk.gray(
                '   2. Ensure image filenames exactly match the story code IDs'
            )
        )
        console.log(
            chalk.gray(
                '   3. Place images in the correct dinosaur scene folders'
            )
        )
        return false
    } else {
        console.log(
            chalk.green('✅ All scene images are present and accounted for!')
        )
        return true
    }
}

/**
 * Main execution function
 */
function main(): void {
    console.log(chalk.magenta('🎬 Dinosaur Scene Image Checker'))
    console.log(chalk.magenta('================================='))
    console.log(
        chalk.gray(
            'Validating that all exported story scenes have corresponding background images...\n'
        )
    )

    const results: CheckResult[] = []

    // Check each dinosaur
    for (const config of DINOSAUR_CONFIGS) {
        const result = checkDinosaurScenes(config)
        results.push(result)
    }

    // Generate final report
    const success = generateReport(results)

    // Exit with appropriate code
    if (!success) {
        console.log(chalk.red('\n💥 Scene image validation failed!'))
        console.log(chalk.gray('Fix the missing images before committing.'))
        process.exit(1)
    } else {
        console.log(chalk.green('\n🎉 Scene image validation passed!'))
    }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
    main()
}

export { checkDinosaurScenes, generateReport, DINOSAUR_CONFIGS }
