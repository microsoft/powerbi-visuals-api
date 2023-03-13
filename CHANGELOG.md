# Change Log - Power BI Custom Visuals API

## 5.3.0
* SelectionId's update-fix for matrix dataView.  
*Note: the selectionId's core data might change therefore a persisted selectionIds/identityIndex using an older API version might not be relevant in matrix dataView.*
* `downloadService`: Adds a new method `exportVisualsContentExtended` which returns expanded reuslt information of the download.
* Extended `VisualUpdateType` enum with 3 new types: `FormattingSubSelectionChange`, `FormatModeChange` and `FilterOptionsChange`.

## 5.2.0
* Adds `dataReductionCustomization` into schema for capabilities.json, this capability offers a declarative way of customizing some data reduction behavior at query generation time.

## 5.1.0 
* Adds Subtotal position type API 
* Adds Custom Sorting API
* Adds new formatting pane `FormattingModel` interfaces

## 4.7.0
* Adds drill API

## 4.6.0
* Adds `privileges` into schema for capabilities.json

## 4.0.0
* `openModalDialog` enhancements: allow defining the dialog's size, position and title.

## 3.8.4
* Fixed `create` interface.

## 3.8.3
* `supportEnhancedTooltips` : added the "supportEnhancedTooltips" as a capability, it enables modern visual tooltip which includes data point drill actions and updated styling.

## 3.8.2
* `openModalDialog` : display an interactive modal dialog window.

## 3.7.0
* `displayWarningIcon` : enables visuals to display a warning icon with customized text and details.

## 3.6.0
* `supportsEmptyDataView` : added the "supportsEmptyDataView" as a capability, enables visuals to receive formatting properties even if they don't have any data roles.

## 3.5.1
* `VisualEnumerationInstanceKinds` : add enum to support different formatting types
* `VisualObjectInstance` : new `propertyInstanceKind` and `altConstantValueSelector` optional properties to support conditional formatting.


## 3.4.0
* `fetchMoreData` : new `aggregateSegments` parameter (default true), for supporting no-aggregation fetchMoreData.

## 3.2.0
* `supportsMultiVisualSelection` multi selection capabilities for custom visuals

## 2.6.2
* Now visuals are able to use two and more dataViewMappings at the same time.

## 2.6.1
* Add `fontFamily` as one of required properties of `formatting` object type.
* Add `supportsMultiVisualSelection` to schema.

## 2.6.0
* `subtotals` property specifies subtotal customizations applied in customizeQuery method

## 2.5.0
* [Analytics Pane Support](../how-to-guide/analytics-properties/)
* New methods to generate selections for Table rows and Matrix nodes have been added

## 2.3.2
* Change `enum`s to `const enum`s

## 2.3.1
* Stronger filtering capabilities with tuple-filter

## 2.3.0 alpha
* Landing page capabilities for custom visuals

## 2.2.2
* Adds `fontFamily` into schema for capabilities.json

## 2.2.1
* Fix CV API version for patch packages

## 2.2.0
* Custom visuals now support context menu
* Deprecated `applySelectionFilter` from `ISelectionManager`
* `jsonFilters` in `VisualUpdateOptions` interface.

## 2.1.0
* SelectionID's update: use Custom Visuals Selection id's instead of old Selection id's 
* Remove Semantic Query dependency inside the iFrame
* Serialize DataView and remove multiple DataView types
