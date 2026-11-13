# Arista Lab Requestor Home Page Test Plan

## Application Overview

Test plan for the Arista Lab Requestor Home Page at https://henilmistry.github.io/AristaLabRequestor/. The Home Page provides the main toolbar for creating nodes, connecting nodes, generating output, configuring settings, opening help documentation, and reporting issues. Unless a scenario explicitly says otherwise, assume a fresh browser context with cleared local storage, no saved topology, no nodes on the canvas, and navigation begins at the Home Page URL. Each scenario is independent and can be executed in any order.

## Test Scenarios

### 1. Home Page Loading and Toolbar

**Seed:** `tests/seed.spec.ts`

#### 1.1. Home Page loads with expected title, version, toolbar, and initial instruction

**File:** `tests/home-page/home-load.spec.ts`

**Steps:**
  1. Start from a fresh browser context with cleared local storage and navigate to https://henilmistry.github.io/AristaLabRequestor/.
    - expect: The page URL is the Arista Lab Requestor Home Page URL.
    - expect: The browser title is "LabRequestor".
    - expect: The heading text "Welcome to AristaLabRequestor" is visible.
    - expect: The version label "v4.1.1" is visible.
    - expect: A toolbar group labeled "Basic example" is visible.
    - expect: Exactly six toolbar buttons are visible: Node Tool, Connection Tool, Output Tool, Settings Tool, Help Tool, and Question Tool.
    - expect: The informational alert reads: "Select some tool to get started! Click on "?" Icon For Help."
    - expect: Success criteria: all expected Home Page elements render without console-blocking errors or blank content.
    - expect: Failure conditions: missing title, missing toolbar, fewer or more than six toolbar buttons, incorrect initial alert text, or page load failure.

#### 1.2. Toolbar controls expose stable accessible names and are clickable

**File:** `tests/home-page/toolbar-accessibility.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The toolbar buttons are discoverable by accessible role `button` and names Node Tool, Connection Tool, Output Tool, Settings Tool, Help Tool, and Question Tool.
    - expect: Each button has a visible icon with matching alternative text.
    - expect: Success criteria: automated tests can locate each button by role and accessible name without using brittle coordinates.
    - expect: Failure conditions: missing accessible names, duplicate unexpected names, non-clickable controls, or icons without meaningful labels.
  2. Click each internal Home Page toolbar control that does not leave the app: Node Tool, Connection Tool, Output Tool, and Settings Tool. Close any modal before moving to the next control.
    - expect: Each internal toolbar control responds to click input.
    - expect: The page does not crash, reload unexpectedly, or lose the header/toolbar.
    - expect: Modal controls can be dismissed and return focus to the Home Page area.

### 2. Tool Selection and Canvas Instructions

**Seed:** `tests/seed.spec.ts`

#### 2.1. Node Tool selection displays node creation instructions

**File:** `tests/home-page/node-tool-instructions.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The initial informational alert asks the user to select a tool.
  2. Click the "Node Tool" toolbar button.
    - expect: The Node Tool button is selected or receives active focus.
    - expect: The informational alert changes to: "Selected Node Tool : Now, Double click anywhere on the canvas to add node!"
    - expect: No modal is opened by selecting the Node Tool.
    - expect: Success criteria: the user receives clear next-step instructions for adding a node to the canvas.
    - expect: Failure conditions: alert text is missing, stale, misleading, or a dialog opens unexpectedly.

#### 2.2. Connection Tool selection displays connection instructions

**File:** `tests/home-page/connection-tool-instructions.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The initial informational alert asks the user to select a tool.
  2. Click the "Connection Tool" toolbar button.
    - expect: The Connection Tool button is selected or receives active focus.
    - expect: The informational alert changes to: "Selected Connection Tool : Now, click on any two nodes subsequently to add a connection!"
    - expect: No modal is opened by selecting the Connection Tool.
    - expect: Success criteria: the user receives clear next-step instructions for connecting two existing nodes.
    - expect: Failure conditions: alert text is missing, stale, misleading, or a dialog opens unexpectedly.

#### 2.3. Switching between Node and Connection tools updates the instruction without stale state

**File:** `tests/home-page/tool-switching.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The Home Page shows the default selection instruction.
  2. Click "Node Tool".
    - expect: The alert displays the Node Tool double-click instruction.
  3. Click "Connection Tool".
    - expect: The alert immediately changes to the Connection Tool two-node instruction.
    - expect: The previous Node Tool instruction is no longer shown.
  4. Click "Node Tool" again.
    - expect: The alert returns to the Node Tool double-click instruction.
    - expect: Success criteria: repeated switching keeps one current tool instruction visible at a time.
    - expect: Failure conditions: both messages appear, the wrong message remains, or switching causes a modal/page navigation.

#### 2.4. Node Tool supports adding a node from a blank canvas

**File:** `tests/home-page/node-tool-canvas-happy-path.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state with no nodes on the canvas.
    - expect: The canvas area is empty and the default informational alert is visible.
  2. Click "Node Tool".
    - expect: The alert tells the user to double click anywhere on the canvas to add a node.
  3. Double-click an empty point in the visible canvas area.
    - expect: A new node appears at or near the clicked canvas position.
    - expect: The page remains on the Home Page and the toolbar stays visible.
    - expect: Success criteria: a user can create the first topology node using the instructed Home Page workflow.
    - expect: Failure conditions: no node is created, the node appears outside the visible canvas, an unrelated modal opens, or the page errors.

### 3. Output Tool and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 3.1. Output Tool shows a clear error when the canvas has no nodes

**File:** `tests/home-page/output-empty-canvas.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state with no nodes on the canvas.
    - expect: The Home Page toolbar and default informational alert are visible.
  2. Click the "Output Tool" toolbar button.
    - expect: An alert dialog opens.
    - expect: The dialog heading is "Alert!".
    - expect: The dialog body reads "No nodes on the canvas!".
    - expect: The dialog has a header Close button and a footer Close button.
    - expect: Success criteria: users cannot generate output from an empty topology and receive a clear explanation.
    - expect: Failure conditions: no dialog appears, output is generated despite no nodes, message is unclear, or the page becomes unusable.

#### 3.2. Empty-canvas Output alert can be dismissed from both close controls

**File:** `tests/home-page/output-empty-canvas-dismiss.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state with no nodes on the canvas.
    - expect: No modal is open.
  2. Click "Output Tool".
    - expect: The "Alert!" dialog appears with message "No nodes on the canvas!".
  3. Click the footer "Close" button.
    - expect: The dialog closes and the Home Page toolbar is visible.
  4. Click "Output Tool" again.
    - expect: The same "Alert!" dialog appears again.
  5. Click the header "Close" button.
    - expect: The dialog closes and the Home Page toolbar is visible.
    - expect: Success criteria: both close affordances dismiss the modal consistently.
    - expect: Failure conditions: either close button fails, leaves an overlay behind, or prevents later toolbar use.

### 4. Settings Modal

**Seed:** `tests/seed.spec.ts`

#### 4.1. Settings Tool opens App Settings with all expected sections and controls

**File:** `tests/home-page/settings-defaults.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state with cleared local storage.
    - expect: No settings modal is open.
  2. Click the "Settings Tool" toolbar button.
    - expect: An App Settings dialog opens.
    - expect: The dialog contains headings: "App Settings", "Key Bindings", "Canvas Utilities", and "Topology Configuration".
    - expect: The Key Bindings section includes an "Enable Key Bindings" checkbox and rows for Select Node Tool, Select Connection Tool, Open Settings, Generate Code, Unselect Current Tool, and Save Topology.
    - expect: Default key labels are visible: KeyN, KeyC, KeyS, KeyG, Escape, and KeyQ.
    - expect: The Canvas Utilities section includes "Use Custom Images" and rows for Custom Node:Dut Image and Custom Node:Ixia Image.
    - expect: The Topology Configuration section includes radio options "Lab Request - SysTest" and "ACT Lab - YAML File".
    - expect: The saved topology selector shows "No Topology Saved" in a fresh state.
    - expect: Buttons for Delete, Load/Reload, Upload, Close, and Save Settings are visible.
    - expect: Success criteria: all settings sections and controls needed for Home Page configuration are discoverable.
    - expect: Failure conditions: missing section, incorrect default key label, missing radio option, or absent close/save controls.

#### 4.2. Key binding settings can be enabled, individually selected, and rebound

**File:** `tests/home-page/settings-key-bindings.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and open Settings.
    - expect: The App Settings dialog is visible.
  2. Click the "Enable Key Bindings" checkbox.
    - expect: The checkbox becomes checked.
  3. Click the checkbox for the "Select Node Tool" key binding row.
    - expect: The row checkbox becomes checked without changing other unrelated rows.
  4. Click the "Change" button for the "Select Node Tool" key binding row.
    - expect: An inline alert appears with the text "Click the key to update the binding."
  5. Press a new unused key, such as B.
    - expect: The displayed key for Select Node Tool updates to "KeyB".
    - expect: The Settings modal remains open and usable.
    - expect: Success criteria: the user can opt into key bindings and update an individual shortcut from the Home Page settings modal.
    - expect: Failure conditions: key press is ignored, updates the wrong row, closes the modal unexpectedly, or leaves the inline alert in a blocking state.

#### 4.3. Custom image settings can be enabled without disrupting Settings modal state

**File:** `tests/home-page/settings-custom-images.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and open Settings.
    - expect: The Canvas Utilities section is visible.
  2. Click the "Use Custom Images" checkbox.
    - expect: The checkbox becomes checked.
    - expect: The Custom Node:Dut Image and Custom Node:Ixia Image rows remain visible with their Change controls.
    - expect: The Topology Configuration and Key Bindings sections remain visible.
    - expect: Success criteria: enabling custom images is reflected immediately and does not hide or corrupt other settings.
    - expect: Failure conditions: checkbox does not change state, image rows disappear unexpectedly, or the modal layout breaks.

#### 4.4. Topology code generation format can be changed between SysTest and ACT YAML

**File:** `tests/home-page/settings-topology-format.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and open Settings.
    - expect: The Topology Configuration section is visible with both code generation format radio options.
  2. Select "ACT Lab - YAML File".
    - expect: The ACT Lab - YAML File radio is checked.
  3. Select "Lab Request - SysTest".
    - expect: The Lab Request - SysTest radio is checked.
    - expect: The ACT Lab - YAML File radio is no longer checked.
    - expect: Success criteria: the radio group allows exactly one output format at a time.
    - expect: Failure conditions: both radios are selected, neither can be selected, or changing selection affects unrelated controls.

#### 4.5. Saving Settings displays a success confirmation and preserves Home Page usability

**File:** `tests/home-page/settings-save-success.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and open Settings.
    - expect: The App Settings dialog is visible.
  2. Toggle at least one setting, such as Enable Key Bindings or ACT Lab - YAML File.
    - expect: The selected control reflects the changed state.
  3. Click "Save Settings".
    - expect: A success dialog appears above the Settings modal.
    - expect: The success dialog heading is "Success!".
    - expect: The success dialog body reads "Settings has been saved for later use!".
    - expect: The underlying Settings modal remains present behind the success dialog.
    - expect: Success criteria: save action confirms persistence without navigating away from the Home Page.
    - expect: Failure conditions: no confirmation appears, an error appears instead, settings modal disappears unexpectedly, or the page navigates.
  4. Close the success dialog, then close the Settings modal.
    - expect: Both dialogs close cleanly.
    - expect: The Home Page toolbar and informational alert are usable again.

#### 4.6. Settings modal can be closed without saving changes

**File:** `tests/home-page/settings-close-without-save.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and open Settings.
    - expect: The App Settings dialog is visible.
  2. Change a non-destructive setting, such as selecting ACT Lab - YAML File.
    - expect: The changed option is visible in the modal.
  3. Click the Settings modal footer "Close" button without clicking Save Settings.
    - expect: The Settings modal closes.
    - expect: No success dialog appears.
    - expect: The Home Page toolbar is visible and usable.
    - expect: Success criteria: users can abandon settings changes without receiving a save confirmation.
    - expect: Failure conditions: the modal remains open, a save confirmation appears, or toolbar controls become unusable.

#### 4.7. Saved topology controls handle blank state gracefully

**File:** `tests/home-page/settings-blank-topology-actions.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state with no saved topology and open Settings.
    - expect: The saved topology selector shows "No Topology Saved".
  2. Attempt to use the saved-topology Delete and Load/Reload controls while "No Topology Saved" is selected.
    - expect: The application does not crash or navigate away.
    - expect: The Settings modal remains usable.
    - expect: A clear validation message is shown if the action is not allowed, or the action is safely ignored.
    - expect: Success criteria: blank saved-topology state is handled gracefully.
    - expect: Failure conditions: unhandled exception, broken modal state, page reload, or destructive behavior with no saved topology.

### 5. External Navigation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Help Tool navigates to the GitHub repository documentation page

**File:** `tests/home-page/help-navigation.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The Help Tool button is visible in the toolbar.
  2. Click the "Help Tool" toolbar button.
    - expect: The browser navigates in the same tab to https://github.com/HenilMistry/AristaLabRequestor/ or the equivalent repository URL.
    - expect: The destination page title identifies the HenilMistry/AristaLabRequestor GitHub repository.
    - expect: Repository content or README heading "AristaLabRequestor" is visible.
    - expect: Success criteria: users can reach the project documentation/help from the Home Page.
    - expect: Failure conditions: navigation target is incorrect, opens a blank/error page, or the app remains stuck in an intermediate state.
  3. Navigate back to the Home Page or return to the Home Page URL.
    - expect: The Home Page loads again with the toolbar and default informational alert visible.

#### 5.2. Question Tool navigates to the GitHub Issues page for reporting problems

**File:** `tests/home-page/report-issue-navigation.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The Question Tool button is visible in the toolbar.
  2. Click the "Question Tool" toolbar button.
    - expect: The browser navigates in the same tab to https://github.com/HenilMistry/AristaLabRequestor/issues or the equivalent repository Issues URL.
    - expect: The destination page title identifies the repository Issues page.
    - expect: The "Issues" heading and "New issue" entry point are visible, subject to GitHub authentication state.
    - expect: Success criteria: users can reach the issue reporting page from the Home Page.
    - expect: Failure conditions: navigation target is incorrect, the Issues page is unavailable, or the button routes to the repository home instead of Issues.
  3. Navigate back to the Home Page or return to the Home Page URL.
    - expect: The Home Page loads again with the toolbar and default informational alert visible.

### 6. State, Persistence, and Resilience

**Seed:** `tests/seed.spec.ts`

#### 6.1. Saved settings are restored after reloading the Home Page

**File:** `tests/home-page/settings-persistence.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and open Settings.
    - expect: Settings controls are in default fresh-state values.
  2. Enable Key Bindings, select the Select Node Tool row, change its key to KeyB, select ACT Lab - YAML File, and click Save Settings.
    - expect: The success dialog confirms "Settings has been saved for later use!".
  3. Close dialogs and reload the Home Page.
    - expect: The Home Page still loads with title "LabRequestor" and toolbar visible.
  4. Open Settings again.
    - expect: The previously saved settings are restored: Enable Key Bindings is checked, the Select Node Tool row remains selected, the Select Node Tool key shows KeyB, and ACT Lab - YAML File remains selected.
    - expect: Success criteria: saved preferences persist through page reload via local storage.
    - expect: Failure conditions: settings reset unexpectedly, corrupted values appear, or reloading breaks Home Page rendering.

#### 6.2. Home Page returns to blank fresh state after browser storage is cleared

**File:** `tests/home-page/fresh-state-recovery.spec.ts`

**Steps:**
  1. Begin with a browser where settings may have been saved from prior use.
    - expect: The Home Page can load successfully.
  2. Clear site storage/local storage for the Arista Lab Requestor origin and reload the Home Page.
    - expect: The Home Page displays the default toolbar and default informational alert.
    - expect: Settings shows "No Topology Saved" when opened.
    - expect: No previously saved key binding or topology choice remains applied unless it is a built-in default.
    - expect: Success criteria: testers can reliably reset the app to a blank state between independent scenarios.
    - expect: Failure conditions: stale settings remain after storage clear or the app fails to load without saved settings.

#### 6.3. Refreshing the Home Page does not break toolbar or alert state

**File:** `tests/home-page/browser-refresh-resilience.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state.
    - expect: The default alert and toolbar are visible.
  2. Select Node Tool, then refresh the browser page.
    - expect: The page reloads successfully.
    - expect: The title remains "LabRequestor".
    - expect: The toolbar is visible with all six buttons.
    - expect: The Home Page shows a valid instruction alert and no broken modal overlay remains.
    - expect: Success criteria: refresh returns the app to a usable Home Page state.
    - expect: Failure conditions: stale overlays, missing toolbar, blank page, or JavaScript error preventing interaction.

### 7. Responsive and Visual Layout

**Seed:** `tests/seed.spec.ts`

#### 7.1. Home Page layout remains usable on desktop viewport

**File:** `tests/home-page/desktop-layout.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state in a desktop browser viewport.
    - expect: The title, version, toolbar, and informational alert are visible without overlap.
    - expect: Toolbar buttons are aligned and clickable.
    - expect: The informational alert text is fully readable.
    - expect: Success criteria: desktop users can scan the toolbar and instructions without layout obstruction.
    - expect: Failure conditions: text overlap, clipped toolbar buttons, inaccessible controls, or hidden alert.

#### 7.2. Home Page layout remains usable on a narrow mobile viewport

**File:** `tests/home-page/mobile-layout.spec.ts`

**Steps:**
  1. Start from a fresh Home Page state and resize the browser to a narrow mobile-sized viewport.
    - expect: The page remains usable at mobile width.
    - expect: The title or version may wrap if necessary but does not overlap the toolbar or alert.
    - expect: All six toolbar buttons remain reachable.
    - expect: The informational alert text remains readable or wraps without being clipped.
    - expect: Success criteria: core Home Page actions remain accessible on small screens.
    - expect: Failure conditions: controls overlap, buttons become unreachable, alert text is clipped, or horizontal scrolling hides critical actions.
