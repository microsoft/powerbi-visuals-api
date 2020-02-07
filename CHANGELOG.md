# Change Log - Power BI Custom Visuals API

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
