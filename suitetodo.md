# Gamification, Progression, and Reward System

This plan outlines the implementation of incentive structures, reward systems, and a collection gallery to encourage long-term play.

## 1. New Assets & Infrastructure
*   **Character Sprite:** Load `resources/jojopixelart_cut.png` as the default character for the Spelling game.
*   **Reward Images:** Load `resources/jojopixelart_maths.jpeg` and `resources/jojopixelart_spelling.jpeg`.
*   **Data Structure:** Implement an `ItemRegistry.js` to manage all unlockable content (skins, backgrounds, equipment) with rarity tiers.
*   **Persistence:** Update `LevelData.js` (or a new `ProgressManager.js`) to track:
    *   Unlocked items (IDs).
    *   Equipped items.
    *   Full completion status for Math and Spelling categories.

## 2. The Reward System (Gacha)
*   **Trigger:** Winning any game (Math or Spelling) or completing a world.
*   **Rarity Tiers & Probabilities:**
    *   **Common:** 50%
    *   **Uncommon:** 25%
    *   **Rare:** 15%
    *   **Epic:** 7%
    *   **Legendary:** 3%
*   **Duplicate Protection:** The system will check the player's inventory and only award items not already owned. If all items in a tier are owned, it will roll for a lower tier.

## 3. Categories of Unlocked Content
*   **Skins:** Alternative sprites for the Spelling game character.
*   **Backgrounds:** Alternative backgrounds for the Main Menu screen.
*   **Equipment:** "Right Arm" and "Left Arm" items that appear on the character during the Math game scenes.

## 4. Implementation Steps

### Phase 1: Registry & Persistence
*   Create `src/game/data/ItemData.js` with all items categorized by rarity.
*   Enhance local storage logic to save the "Inventory".

### Phase 2: Visual Updates
*   Update `Preloader.js` to load the new pixel art resources.
*   Update `SpellingScene.js` to use `jojopixelart_cut.png`.
*   Modify `MathProblemScene.js` to render equipped arm items.

### Phase 3: Main Menu & Gallery
*   Add a "Contenu Débloqué" (Unlocked Content) button to the `MainMenu`.
*   Create a `CollectionScene` where players can view their items and the two special completion pictures.
*   The special pictures unlock only when ALL math or ALL spelling levels are finished.

### Phase 4: Loot Logic
*   Implement a `LootManager.js` that handles the random roll logic after a victory.
*   Add a "New Item Unlocked!" popup scene or overlay.

## 5. Verification & Testing
*   **Rarity Check:** Simulate 1000 rolls to verify drop percentages.
*   **Uniqueness:** Verify that no duplicate items are ever awarded.
*   **Persistence:** Ensure items remain unlocked after page refresh.

