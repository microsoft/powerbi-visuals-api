declare namespace powerbi {

    // todo delete export const enum SelectEventType {
    //     DataPointSelection = 0,
    //     FormattingSubSelection = 1,
    // }


    export interface VisualObject {
        /** The name of the object (as defined in object descriptors). */
        objectName: string;

        /** Data-bound repitition selection */
        // todo should check what are the uses of the following param
       // todo not sure if this should be added since CV's doesnt implement data repetition selectorsByColumn: SelectorsByColumn;
    }
    
    export interface SelectEventArgsBase {
        // todo delete since its not used // type: SelectEventType | undefined;
        visualObjects: VisualObject[];
        // todo delete since its not used // selectionMode?: visuals.MultiSelectMode;
    }

    export namespace visuals {
        export interface VisualSubSelection<TMetadata = unknown> extends Pick<SelectEventArgsBase, 'visualObjects'> {
            displayName?: string;
            subSelectionType?: SubSelectionStylesType;
            selectionOrigin?: {
                x: number;
                y: number;
            };
            /** Whether to show the UI for this sub-selection, like formatting context menus and toolbar */
            showUI?: boolean;
            focusOrder?: number;
            metadata?: TMetadata;
        }

        // Style (Mini-Toolbar/Floatie) interfaces

        /**
         * Contains data needed reference a particular style
         * Typically used to lookup data in the formatting model to build the relevant control
         * All except sliceUid is optional and just extra data to narrow the search when available.
         */
        export interface CardFormattingModelReference {
            cardUid?: string;
        }

        export interface GroupFormattingModelReference extends CardFormattingModelReference {
            groupUid?: string;
        }

        export interface SliceFormattingModelReference extends GroupFormattingModelReference {
            sliceUid: string;
            selector?: powerbi.data.Selector;
        }

        /** Indicates the type of restricting element that will be used when creating the outline.
         */
        export const enum SubSelectionOutlineRestrictionType {
            /**
             * A clamping element will adjust the outline to prevent it from extending beyond
             * the restricting element.
             */
            Clamp,
            /**
             * A clipping element will make parts of the outline not visible if the outline extends beyond the
             * restricting element's bounds. 
             */
            Clip
        }

        export interface IOffset {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }

        /** Options used to indicate if a restricting element should allow outlines more space to
         * generate by adding padding or if the restricting element should constrict the outline more
         * by adding a margin.
         */
        export interface SubSelectionOutlineRestrictionOptions {
            padding?: IOffset;
            margin?: IOffset;
        }

        export type FormattingModelReference = CardFormattingModelReference | GroupFormattingModelReference | SliceFormattingModelReference;

        // Const enum to allow easier type guarding between SubSelectionStyle
        export const enum CustomSubSelectionStyleType {
            ContextMenu = "contextmenu",
        }

        // If defined, lets the mini-toolbar know to check for subSelectionShortcuts for context menu items
        export interface ContextMenuSubSelectionStyle {
            type: CustomSubSelectionStyleType.ContextMenu;
        }

        // For getSubSelectionShortcuts to return a specific set of shortcuts
        export const enum SubSelectionShortcutsKey {
            Border = 'border',
            Grid = 'grid',
        }

        export interface SubSelectionStyle {
            reference: SliceFormattingModelReference;
            label: string;
        }

        export const enum SubSelectionStylesType {
            None = 0,
            Text = 1,
            NumericText = 2,
            Shape = 3,
        }

        export interface BaseSubSelectionStyles {
            type: SubSelectionStylesType;
        }

        export interface FontSubSelectionStyles {
            font: SubSelectionStyle;
            fontColor: SubSelectionStyle;
            background?: SubSelectionStyle; // TODO: This will probably need to support a more advanced color picker
            horizontalAlignment?: SubSelectionStyle;
            wordWrap?: SubSelectionStyle;
            [SubSelectionShortcutsKey.Border]?: ContextMenuSubSelectionStyle;
            [SubSelectionShortcutsKey.Grid]?: ContextMenuSubSelectionStyle;
        }

        export interface TextSubSelectionStyles extends BaseSubSelectionStyles, FontSubSelectionStyles {
            type: SubSelectionStylesType.Text;
        }

        export interface NumericTextSubSelectionStyles extends BaseSubSelectionStyles, FontSubSelectionStyles {
            type: SubSelectionStylesType.NumericText;
            displayUnits?: SubSelectionStyle;
            precision?: SubSelectionStyle;
        }

        export interface ShapeSubSelectionStyles extends BaseSubSelectionStyles {
            type: SubSelectionStylesType.Shape;

            // TODO: This will probably need to support a more advanced color picker
            fill?: SubSelectionStyle;
            stroke?: SubSelectionStyle;
            style?: SubSelectionStyle;
            color?: SubSelectionStyle;
            width?: SubSelectionStyle;
            [SubSelectionShortcutsKey.Grid]?: ContextMenuSubSelectionStyle;
        }

        export type SubSelectionStyles = TextSubSelectionStyles | NumericTextSubSelectionStyles | ShapeSubSelectionStyles;

        // Shortcut (Context) Menu interfaces

        export interface KeyboardShortcut {
            altKey?: boolean;
            ctrlKey?: boolean;
            metaKey?: boolean;
            shiftKey?: boolean;
            key: string;
            nextValue: boolean;
        }

        export const enum VisualShortcutType {
            Reset = 0,
            Navigate = 1,
            Toggle = 2,
            Picker = 3,
            Sort = 4,
            CustomAction = 5,
            ConditionalFormatting = 6,
            Divider = 7,
            SubMenu = 8,
            SetValue = 9,
        }

        /**
         * Base level visual shortcut. Provides a common base for Visual and Minerva shortcuts.
         */
        export interface VisualBaseShortcut {
            type: VisualShortcutType;
        }

        /**
         * Provides a common base for Visual and Minerva reset shortcuts.
         */
        export interface VisualResetShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.Reset;
            // TODO: PM and Design to determine behavior
        }

        /**
         * Provides a common base for Visual and Minerva navigate shortcuts.
         */
        export interface VisualNavigateShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.Navigate;
            destinationUids: FormattingModelReference[];
        }

        /**
         * Provides a common base for Visual and Minerva toggle shortcuts.
         */
        export interface VisualToggleShortcut extends VisualBaseShortcut, FormattingReference {
            type: VisualShortcutType.Toggle;
            relatedToggledSourceUids?: FormattingReference[];
        }

        /**
         * Provides a common base for Visual and Minerva conditional formatting shortcuts.
         */
        export interface VisualConditionalFormattingShortcut extends VisualBaseShortcut, FormattingReference {
            type: VisualShortcutType.ConditionalFormatting;
        }

        /**
         * Provides a common base for Visual and Minerva picker shortcuts.
         */
        export interface VisualPickerShortcut extends VisualBaseShortcut, FormattingReference {
            type: VisualShortcutType.Picker;
        }

        /**
         * Provides a common base for Visual and Minerva sort shortcuts.
         */
        export interface VisualSortShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.Sort;
            sortableField: SortableFieldDescriptor;
            key: VisualRoleKey | string;
        }

        /**
         * Provides a common base for Visual and Minerva custom action shortcuts.
         */
        export interface VisualCustomActionShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.CustomAction;
            customAction: () => void;
            icon?: string;
            disabled?: boolean;
        }

        export interface SliceReferenceAndValue extends SliceFormattingModelReference {
            value: powerbi.DataViewPropertyValue | undefined;
            isTopLevelToggle?: boolean;
        }

        // No support for composite slices or conditional formatting objects yet
        export interface VisualSetValueShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.SetValue;
            referencesAndValues: SliceReferenceAndValue[];
            icon?: string;
        }

        export type VisualSetValueSubSelectionShortcut = VisualSetValueShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

        /**
         * Provides the properties required for UI/UX interaction provided by Visuals.
         */
        interface VisualBaseSubSelectionShortcut {
            suppressOnUI?: boolean;
            keyboardShortcuts?: KeyboardShortcut[];
        }

        export interface VisualLabelShortcut {
            label: string;
        }

        export interface FormattingReference {
            sourceUid: string;
            selector?: data.Selector;
        }

        /**
         * Resets settings with attributes related to sub-selection elements. Reset to default shortcuts will infer
         * slices to be reset provided to the mini-toolbar by implementing `getSubSelectionStyles` and sibling shortcuts
         * provided alongside the `VisualResetSubSelectionShortcut`.
         */
        export interface VisualResetSubSelectionShortcut extends VisualResetShortcut, VisualBaseSubSelectionShortcut {
            /**
             * Additional UIDs which should be reset which may not be included with `SubSelectionStyles` to the mini-toolbar or sibling 
             * `SubSelectionShortcuts`. UIDs can be card, group or slice UIDs and are collective and inclusive.
             */
            relatedResetSourceUids?: FormattingReference[];
            /**
             * UIDs which may be provided with `SubSelectionStyles` the mini-toolbar or sibling `SubSelectionShortcuts` but should not
             * be reset. UIDs can be card, group or slice UIDs and are collective and inclusive.
             */
            excludedResetSourceUids?: FormattingReference[];
        }

        /**
         * Navigates to the item given the particular uid. Should use visual-level `VisualSubSelectionShortcut` for
         * cases where UI/UX properties are needed.
         */
        export type VisualNavigateSubSelectionShortcut = VisualNavigateShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

        /**
         * Looks up the data in the formatting model for the `sourceUid` and uses it to generate a shortcut. Should use 
         * visual-level `VisualSubSelectionShortcut` for cases where UI/UX properties are needed.
         */
        export interface VisualToggleSubSelectionShortcut extends VisualToggleShortcut, VisualBaseSubSelectionShortcut {
            /** Label to display when the toggle is "off" (current state is false) */
            enabledLabel?: string; // TODO: Swap with disabledLabel or rename to enableLabel
            /** Label to display when the toggle is "on" (current state is true) */
            disabledLabel?: string; // TODO: Swap with enabledLabel or rename to disableLabel
        }

        /**
         * Looks up the data in the formatting model for the `sourceUid` and uses it to generate a shortcut Should use 
         * visual-level `VisualSubSelectionShortcut` for cases where UI/UX properties are needed.
         */
        export type VisualConditionalFormattingSubSelectionShortcut = VisualConditionalFormattingShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

        /**
         * Looks up the data in the formatting model for the `sourceUid` and uses it to generate a shortcut Should use 
         * visual-level `VisualSubSelectionShortcut` for cases where UI/UX properties are needed.
         */
        export type VisualPickerSubSelectionShortcut = VisualPickerShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

        /**
         * Sorts based on the given descriptor. Should use visual-level `VisualSubSelectionShortcut` for cases where UI/UX properties are needed.
         */
        export type VisualSortSubSelectionShortcut = VisualSortShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

        /**
         * Executes a custom action provided in callback. Should use visual-level `VisualSubSelectionShortcut` for cases where UI/UX 
         * properties are needed.
         */
        export type VisualCustomActionSubSelectionShortcut = VisualCustomActionShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

        /**
         * Divider
         */
        export interface VisualDividerSubSelectionShortcut extends VisualBaseSubSelectionShortcut {
            type: VisualShortcutType.Divider;
        }

        export type VisualSubMenuItem = VisualToggleSubSelectionShortcut | VisualConditionalFormattingSubSelectionShortcut | VisualDividerSubSelectionShortcut | VisualNavigateSubSelectionShortcut;

        /**
         * Submenu which contains a list of visual sub-selection shortcuts. Toggle items are listed as 'checkable' items, and other shortcuts behave as normal.
         * Differs from a picker as the options provided in the submenu is provided where picker's options are derived from the slice/card in the formatting store.
         */
        export interface VisualSubMenuSubSelectionShortcut extends VisualBaseSubSelectionShortcut, VisualLabelShortcut {
            type: VisualShortcutType.SubMenu;
            shortcuts: VisualSubMenuItem[];
        }

        /**
         * Visual sub-selection Shortcut type which provides properties related to UI/UX interaction related to Visual interaction.
         */
        export type VisualSubSelectionShortcut = VisualResetSubSelectionShortcut | VisualToggleSubSelectionShortcut | VisualPickerSubSelectionShortcut | VisualSortSubSelectionShortcut | VisualCustomActionSubSelectionShortcut | VisualDividerSubSelectionShortcut | VisualNavigateSubSelectionShortcut | VisualSubMenuSubSelectionShortcut | VisualConditionalFormattingSubSelectionShortcut | VisualSetValueSubSelectionShortcut;

        /**
         * Shortcuts that the visual can send for a sub-selection
         * Enforces an order where a navigate must always be last
         * TODO: Verify with PM if we want to enforce this order, or give more flexibility
         */
        export type VisualSubSelectionShortcuts = [
            ...VisualSubSelectionShortcut[],
            VisualNavigateSubSelectionShortcut
        ];    
    }
}