# Scene Image Validation Test Script

This script can be used to test the scene validation functionality with mock scenarios.

## Test Commands

```bash
# Run the normal scene validation
npm run check-scenes

# Test with all images present (should pass)
node scripts/test-scene-validation.js --all-present

# Test with specific missing images (should fail)
node scripts/test-scene-validation.js --missing-images
```

## Integration with CI/CD

Add this to your GitHub Actions workflow:

```yaml
- name: Validate Scene Images
  run: npm run check-scenes
```

This will ensure that any pull request or push to main branch validates scene image consistency.
