# Scene Image Validation System

This system automatically validates that all exported story codes in the dinosaur JSON files have corresponding scene images in their respective folders.

## How It Works

The validation script (`scripts/check-scene-images.js`) performs the following checks:

1. **Reads each dinosaur's JSON file** from `public/data/`
2. **Identifies exported story codes** (those marked with `exported: "TRUE"` or `exportedForReview: "TRUE"`)
3. **Checks for corresponding PNG images** in the dinosaur's scene folder
4. **Reports any discrepancies** with detailed information

## Dinosaur Configuration

The script checks these dinosaurs:

| Dinosaur      | JSON File            | Scene Folder     | Export Field        |
| ------------- | -------------------- | ---------------- | ------------------- |
| Agujaceratops | `Agujaceratops.json` | `AgujaScenes/`   | `exported`          |
| Kritosaurus   | `Kritosaurus.json`   | `KritoScenes/`   | `exported`          |
| Tyrannosaurus | `Tyrannosaurus.json` | `TyrannoScenes/` | `exported`          |
| Mosasaurus    | `Mosasaurus.json`    | `MosaScenes/`    | `exportedForReview` |
| Protostega    | `Protes.json`        | `ProtosScenes/`  | `exportedForReview` |

## Usage

### Manual Check

```bash
npm run check-scenes
```

### Automatic Validation

The script automatically runs during:

- **Pre-commit hooks** - Validates scenes before any commit
- **CI/CD pipeline** - Ensures consistency in automated builds

## Example Output

```
🎬 Dinosaur Scene Image Checker
=================================
Validating that all exported story scenes have corresponding background images...

🦕 Checking Agujaceratops...
🦕 Checking Kritosaurus...
🦕 Checking Tyrannosaurus...
🦕 Checking Mosasaurus...
🦕 Checking Protostega...

📊 SCENE IMAGE ANALYSIS REPORT
=====================================

✅ Agujaceratops: Complete (57 images available)
❌ Kritosaurus: 1 missing images
   📈 59 exported scenes, 58 images available
   📸 Missing: 1b_2b_3b_4a_5a.png
      Environment: forest
      Story: While you are resting, one of the older Kritosaurus spots a Tyrannosaurus stalking...

📋 SUMMARY
===========
❌ Total missing scene images: 1

💡 Action required:
   1. Create the missing scene images listed above
   2. Ensure image filenames exactly match the story code IDs
   3. Place images in the correct dinosaur scene folders
```

## File Naming Convention

Scene images must follow this naming pattern:

- **Filename**: `{Code ID}.png`
- **Example**: If the story entry has `"Code ID": "1a_2b_3a"`, the image should be named `1a_2b_3a.png`

## Story Code Rules

The script validates images for story codes that:

- ✅ Have a non-empty `"Code ID"` field
- ✅ Are marked as exported (`exported: "TRUE"` or `exportedForReview: "TRUE"`)
- ❌ Are NOT conclusion entries (ending with `_6`)

## Troubleshooting

### Common Issues

1. **Missing Image File**

    - Create the PNG file with the exact name shown in the error
    - Place it in the correct dinosaur scene folder

2. **Filename Mismatch**

    - Ensure the filename exactly matches the `Code ID`
    - Check for case sensitivity and special characters

3. **Wrong Folder**
    - Verify the image is in the correct dinosaur's scene folder
    - Check the folder mapping table above

### Bypassing Validation (Not Recommended)

If you need to commit despite missing images (e.g., images are being created separately):

```bash
git commit --no-verify -m "Your commit message"
```

**Note**: This bypasses ALL pre-commit checks, not just scene validation.

## Integration with Development Workflow

### Pre-commit Hook

The validation runs automatically before each commit. If validation fails:

1. The commit is blocked
2. You'll see a detailed report of missing images
3. Create the missing images or fix the issues
4. Try committing again

### Adding New Dinosaurs

To add a new dinosaur to the validation system:

1. Add a new entry to `DINOSAUR_CONFIGS` in `scripts/check-scene-images.js`:

```javascript
{
  name: 'NewDinosaur',
  jsonFile: 'NewDinosaur.json',
  sceneFolder: 'NewDinoScenes',
  exportedField: 'exported' // or 'exportedForReview'
}
```

2. Create the corresponding JSON file in `public/data/`
3. Create the scene folder in `public/`

## Performance

The script is designed to be fast and efficient:

- Runs in under 2 seconds for the complete validation
- Only checks files marked as exported
- Uses efficient file system operations
- Provides clear, actionable error messages

## Maintenance

The script is self-contained and requires minimal maintenance. However, if you:

- Add new dinosaurs, update `DINOSAUR_CONFIGS`
- Change the JSON structure, update the field access logic
- Move folders, update the path constants
