/**
 * OnObject Formatting Interfaces
 */

declare module powerbi {
    export namespace visuals {
        export interface SubSelectionOrigin extends powerbi.extensibility.IPoint {
            offset?: powerbi.extensibility.IPoint;
        }

        export interface CustomVisualObject {
            objectName: string;
            selectionId: powerbi.visuals.ISelectionId;
        }

        type NominalType<TBase, TTag> = TBase & { readonly __tag: TTag };
        export type SubSelectionRegionOutlineId = NominalType<string, 'SubSelectionRegionOutlineId'>;

        export interface CustomVisualSubSelection {
            customVisualObjects: CustomVisualObject[];
            displayName: string;
            subSelectionType: SubSelectionStylesType;
            selectionOrigin: SubSelectionOrigin;
            /** Whether to show the UI for this sub-selection, like formatting context menus and toolbar */
            showUI: boolean;
            /** If immediate direct edit should be triggered, the ID of the sub-selection outline to edit */
            immediateDirectEdit?: string;
            metadata?: unknown;
        }

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
        
        export interface FormattingId {
            objectName: string;
            propertyName: string;
            selector?: powerbi.data.Selector;
        }
        
        export type SliceFormattingId = FormattingId;
        
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
        
        export type FormattingModelReference = CardFormattingModelReference | GroupFormattingModelReference;
        
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
            reference: FormattingId;
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
        
        export type FontSubSelectionStyles = FontFormattingIds & {
            fontColor: SubSelectionStyle;
            background?: SubSelectionStyle;
            horizontalAlignment?: SubSelectionStyle;
            wordWrap?: SubSelectionStyle;
            [SubSelectionShortcutsKey.Border]?: ContextMenuSubSelectionStyle;
            [SubSelectionShortcutsKey.Grid]?: ContextMenuSubSelectionStyle;
        }
        
        export type FontFormattingIds = {
            fontFamily: SubSelectionStyle;
            fontSize: SubSelectionStyle;
            bold: SubSelectionStyle;
            italic: SubSelectionStyle;
            underline: SubSelectionStyle;
        }
        
        export type TextSubSelectionStyles = BaseSubSelectionStyles & FontSubSelectionStyles & {
            type: SubSelectionStylesType.Text;
        }
        
        export interface PrecisionSubSelectionStyle extends SubSelectionStyle {
            defaultPrecision?: number;
        }
        
        export type NumericTextSubSelectionStyles = BaseSubSelectionStyles & FontSubSelectionStyles & {
            type: SubSelectionStylesType.NumericText;
            displayUnits?: SubSelectionStyle;
            precision?: PrecisionSubSelectionStyle;
        }
        
        export interface ShapeSubSelectionStyles extends BaseSubSelectionStyles {
            type: SubSelectionStylesType.Shape;
        
            fill?: SubSelectionStyle;
            stroke?: SubSelectionStyle;
            style?: SubSelectionStyle;
            color?: SubSelectionStyle;
            width?: SubSelectionStyle;
            height?: SubSelectionStyle;
            shadow?: SubSelectionStyle;
            shadowPreset?: SubSelectionStyle;
            shadowPosition?: SubSelectionStyle;
            [SubSelectionShortcutsKey.Grid]?: ContextMenuSubSelectionStyle;
        }
        
        export type SubSelectionStyles = TextSubSelectionStyles | NumericTextSubSelectionStyles | ShapeSubSelectionStyles;
        
        // Shortcut (Context) Menu interfaces
        
        export const enum VisualShortcutType {
            Reset = 0,
            Navigate = 1,
            Toggle = 2,
            Picker = 3,
            Sort = 4,
            ConditionalFormatting = 6,
            Divider = 7,
            SubMenu = 8,
            SetValue = 9
        }
        
        /**
         * Base level visual shortcut. Provides a common base for Visual shortcuts.
         */
        export interface VisualBaseShortcut {
            type: VisualShortcutType;
        }
        
        /**
         * Provides a common base for Visual shortcuts.
         */
        export interface VisualResetShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.Reset;
        }
        
        /**
         * Provides a common base for Visual navigate shortcuts.
         */
        export interface VisualNavigateShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.Navigate;
            destinationInfo: FormattingModelReference;
        }
        
        
        /**
         * Provides a common base for Visual and Minerva toggle shortcuts.
         */
        export type VisualToggleShortcut = VisualBaseShortcut & FormattingId & {
            type: VisualShortcutType.Toggle;
            relatedToggledFormattingIds?: FormattingId[];
        };
        
        /**
         * Provides a common base for Visual and Minerva conditional formatting shortcuts.
         */
        export interface VisualConditionalFormattingShortcut extends VisualBaseShortcut, FormattingId {
            type: VisualShortcutType.ConditionalFormatting;
        }
        
        /**
         * Provides a common base for Visual and Minerva picker shortcuts.
         */
        export interface VisualPickerShortcut extends VisualBaseShortcut, FormattingId {
            type: VisualShortcutType.Picker;
        }
        
        export const enum VisualRoleKey {
            Rows = 'Rows',
            Category = 'Category',
            Legend = 'Legend'
        }

        /**
         * Provides a common base for Visual and Minerva sort shortcuts.
         */
        export interface VisualSortShortcut extends VisualBaseShortcut {
            type: VisualShortcutType.Sort;
            sortableField: powerbi.extensibility.visual.CustomVisualSortableFieldDescriptor;
            key: VisualRoleKey | string;
        }
        
        export type SliceReferenceAndValue =  FormattingId & {
            value: DataViewPropertyValue | undefined;
            isTopLevelToggle?: boolean;
        };
        
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
        export interface VisualBaseSubSelectionShortcut {
            suppressOnUI?: boolean;
        }
        
        export interface VisualLabelShortcut {
            label: string;
        }
        
        /**
         * Resets settings with attributes related to sub-selection elements. Reset to default shortcuts will infer
         * slices to be reset provided to the mini-toolbar by implementing `getSubSelectionStyles` and sibling shortcuts
         * provided alongside the `VisualResetSubSelectionShortcut`.
         */
        export interface VisualResetSubSelectionShortcut extends VisualResetShortcut, VisualBaseSubSelectionShortcut {
            /**
             * Additional IDs which should be reset which may not be included with `SubSelectionStyles` to the mini-toolbar or sibling 
             * `SubSelectionShortcuts`.
             */
            relatedResetFormattingIds?: FormattingId[];
            /**
             * IDs which may be provided with `SubSelectionStyles` the mini-toolbar or sibling `SubSelectionShortcuts` but should not
             * be reset.
             */
            excludedResetFormattingIds?: FormattingId[];
        }
        
        export type VisualNavigateSubSelectionShortcut = VisualNavigateShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;
        
        export type VisualToggleSubSelectionShortcut = VisualToggleShortcut & VisualBaseSubSelectionShortcut & {
            /** Label to display when the toggle is "off" (current state is false) */
            enabledLabel?: string; 
            /** Label to display when the toggle is "on" (current state is true) */
            disabledLabel?: string;
        };
        
        export type VisualConditionalFormattingSubSelectionShortcut = VisualConditionalFormattingShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;
        
        export type VisualPickerSubSelectionShortcut = VisualPickerShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;
        
        export type VisualSortSubSelectionShortcut = VisualSortShortcut & VisualBaseSubSelectionShortcut & VisualLabelShortcut;

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
        export type VisualSubSelectionShortcut = VisualResetSubSelectionShortcut | VisualToggleSubSelectionShortcut | VisualPickerSubSelectionShortcut | VisualSortSubSelectionShortcut | VisualDividerSubSelectionShortcut | VisualNavigateSubSelectionShortcut | VisualSubMenuSubSelectionShortcut | VisualConditionalFormattingSubSelectionShortcut | VisualSetValueSubSelectionShortcut;
        
        /**
         * Shortcuts that the visual can send for a sub-selection
         * Enforces an order where a navigate must always be last
         */
        export type VisualSubSelectionShortcuts = [
            ...VisualSubSelectionShortcut[],
            VisualNavigateSubSelectionShortcut
        ];

        export const enum SubSelectableDirectEditStyle {
            // Textbox exactly fills the outline
            Outline = 0,
            // Text is vertical and edited like Y axis title - textbox is centered vertically in the outline
            // and as close to centered as possible horizontally
            Vertical = 1,
            // Text is horizontal and edited like X axis title - textbox is centered horizontally in the outline
            // with same height as outline but wide enough to accomodate additional text comfortably
            HorizontalCentered = 2,
            // Text is horizontal and edited like legend title - textbox is left alighed in the outline
            // with same height as outline but wide enough to accomodate additional text comfortably
            HorizontalLeft = 3,
        }

        export interface SubSelectableDirectEdit {
            reference: FormattingId;
            style: SubSelectableDirectEditStyle;
            displayValue?: string;
        }

        export const enum SubSelectionOutlineType {
            Group = 0,
            Rectangle = 1,
            Line = 2,
            Polygon = 3,
            Arc = 4,
        }

        /** Indicates the visibility of the outline.  Visibility can affect the style (color) as well as available interactions */
        export const enum SubSelectionOutlineVisibility {
            None = 0,
            Hover = 1,
            Active = 2,
        }

        export interface SubSelectionOutlineBase {
            type: SubSelectionOutlineType;
            clipPath?: SubSelectionClipPath;
        }

        export interface GroupSubSelectionOutline extends SubSelectionOutlineBase {
            type: SubSelectionOutlineType.Group;
            outlines: SubSelectionOutline[];
        }

        export interface RectangleSubSelectionOutline extends SubSelectionOutlineBase {
            type: SubSelectionOutlineType.Rectangle;
            cVDirectEdit?: SubSelectableDirectEdit | undefined;
            x: number;
            y: number;
            width: number;
            height: number;
        }

        export interface LineSubSelectionOutline extends SubSelectionOutlineBase {
            type: SubSelectionOutlineType.Line;
            points: powerbi.extensibility.IPoint[];
        }

        export interface PolygonSubSelectionOutline extends SubSelectionOutlineBase {
            type: SubSelectionOutlineType.Polygon;
            points: powerbi.extensibility.IPoint[];
        }

        export interface ArcSubSelectionOutline extends SubSelectionOutlineBase {
            type: SubSelectionOutlineType.Arc;
            center: powerbi.extensibility.IPoint;
            innerRadius: number;
            outerRadius: number;
            startAngle: number;
            endAngle: number;
        }

        export interface GroupSubSelectionClipPath {
            type: SubSelectionOutlineType.Group;
            clipPaths: SubSelectionClipPath[];
        }

        export interface RectangleSubSelectionClipPath {
            type: SubSelectionOutlineType.Rectangle;
            x: number;
            y: number;
            width: number;
            height: number;
        }

        export interface PolygonSubSelectionClipPath {
            type: SubSelectionOutlineType.Polygon;
            points: powerbi.extensibility.IPoint[];
        }

        export type SubSelectionClipPath = GroupSubSelectionClipPath | RectangleSubSelectionClipPath | PolygonSubSelectionOutline;

        export type SubSelectionOutline = GroupSubSelectionOutline
            | RectangleSubSelectionOutline
            | LineSubSelectionOutline
            | PolygonSubSelectionOutline
            | ArcSubSelectionOutline;

        export interface SubSelectionRegionOutline {
            id: string;
            visibility: SubSelectionOutlineVisibility; // controls visibility for outlines
            outline: SubSelectionOutline;
        }

        export type SubSelectionRegionOutlineFragment = Omit<SubSelectionRegionOutline, 'visibility'>;
    }
}