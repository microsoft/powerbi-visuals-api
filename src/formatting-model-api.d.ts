/**
 * Formatting Pane Model Interfaces
 */

declare module powerbi {
    export namespace visuals {
        export type FormattingModelWarnings = { [cardUid: string]: IVisualWarning };

        export interface FormattingModel {
            cards: (FormattingCard | FormattingCardPlaceholder)[];
            modelUnavailableImageName?: string;
            modelUnavailableMessageKey?: string;
            modelUnavailableLearnMoreLink?: string;
            // this is used for displaying messages in formatting pane, with an action to usually open some dialog.
            formattingModelMessage?: FormattingModelMessage;
            warnings?: FormattingModelWarnings;
        }

        export interface FormattingModelMessage {
            messageKey: string;
        }

        export interface FormattingWarning {
            warningMessage?: IVisualErrorMessage;
        }

        export interface FormattingCard extends VisualFormattingUid, VisualFormattingDisplayName, FormattingWarning {
            disabled?: boolean;
            /** card disabled reason */
            disabledReason?: string;
            /** This is top-level card On/Off property */
            topLevelToggle?: EnabledSlice;
            groups: (FormattingGroup | FormattingGroupPlaceholder)[];
            /** This contains the list of descriptors for revert to default, note the descriptors of all the slices ever possible in the card must be added */
            revertToDefaultDescriptors?: FormattingDescriptor[];
            /** if true, this card should be populated into the analytics pane */
            analyticsPane?: boolean;
        }

        export interface FormattingGroup extends VisualFormattingUid, VisualFormattingDisplayName {
            disabled?: boolean;
            /** card disabled reason */
            disabledReason?: string;
            /** This is top-level card On/Off property */
            topLevelToggle?: EnabledSlice;
            slices?: (FormattingSlice | FormattingSlicePlaceholder)[];
            container?: FormattingContainer;
            containerDisabled?: boolean;
            /** Allows slices in the same group as containers. Slices are outside of the container's context */
            sliceWithContainer?: boolean;
            /**
             * If delaySaveSlices is true, then this group's slices' value changes won't be saved to the visual until a
             * signal action is taken. E.g., for an Analytics Pane forecast, the forecast parameter values shouldn't be
             * saved to the visual until the Apply button is clicked. Note that this applies to all slices in the group.
             */
            delaySaveSlices?: boolean;
            collapsible?: boolean;
            /** defaulted to true, if false, we will keep the group enabled even though it's parent card has topLevelToggle value set to false */
            inheritDisabled?: boolean;
        }

        export interface FormattingContainer extends VisualFormattingUid, VisualFormattingDisplayName {
            containerItems: FormattingContainerItem[];
            /**
             * Whether this container allows editing, including add/remove container items, and
             * edit of indivisual container item's value itself.
             */
            isEditable?: boolean;
        }

        export interface FormattingContainerItem extends VisualFormattingUid {
            displayName: string;
            disabled?: boolean;
            slices?: FormattingSlice[];
            groups?: Omit<FormattingGroup, 'containers'>[];
        }

        export type FormattingSlice = SimpleVisualFormattingSlice | CompositeVisualFormattingSlice;

        export interface BaseVisualFormattingSlice<TControl> extends VisualFormattingUid {
            control: TControl;
            disabled?: boolean;
            suppressUndoRedoRegister?: boolean;
        }

        /** Slice display name is required for composite slices */
        export interface CompositeVisualFormattingSlice extends BaseVisualFormattingSlice<FormattingCompositeControl>, VisualFormattingDisplayName, VisualFormattingInfoIconText {
        }

        /** Slice display name is optional for simple slices */
        export interface SimpleVisualFormattingSlice extends BaseVisualFormattingSlice<FormattingSimpleControl>, Partial<VisualFormattingDisplayName>, VisualFormattingInfoIconText {
            // Properties added here to add comments
            /** Only set if needed to override the capabilities */
            displayName?: string;
            /** Only set if needed to override the capabilities */
            description?: string;
        }

        export interface EnabledSlice extends BaseVisualFormattingSlice<FormattingControls<Pick<SimpleComponentType, "ToggleSwitch">>> {
            suppressDisplayName: boolean;
        }

        export interface VisualFormattingUid {
            /** A unique Identifier */
            uid: string;
        }

        export interface VisualFormattingDisplayName {
            displayName: string;
            description?: string;
            /**
             * It will be used as an alternate name for the formatting card (will be only used for searching purposes)
             */
            aliasName?: string;
            suppressDisplayName?: boolean;
        }

        export interface VisualFormattingInfoIconText {
            /** Only set if needed to display info icon with tooltip for the slice */
            infoIconText?: string;
        }

        export interface FormattingDescriptor extends DataViewObjectPropertyIdentifier {
            selector?: data.Selector;
            /** (Optional) Set the required type for particular property that support variant types. */
            propertyTypes?: ValueTypeDescriptor;
            instanceKind?: VisualEnumerationInstanceKinds;
            /** (Optional) Allows visuals to specify an alternate selector to be used when the value is a constant,
            * as opposed to a data-bound expression. This selector may be used to place the object at a higher scope,
            * such as the static scope, to avoid repeating the same constant value on each instance of a scope.*/
            altConstantValueSelector?: data.Selector;
        }

        export const enum FormattingPlaceholderType {
            Card = 'card',
            Group = 'group',
            Slice = 'slice',
        }

        export interface FormattingPlaceholder {
            type: FormattingPlaceholderType;
            source: string;
            name: string;
            /** Whether a default value should be returned if the placeholder isn't able to be resolved normally */
            suppressDefaultValue?: boolean;
        }

        export interface FormattingCardPlaceholder extends FormattingPlaceholder {
            type: FormattingPlaceholderType.Card;

            /** if true, this card should be populated into the analytics pane. */
            analyticsPane?: boolean;
        }

        export interface FormattingGroupPlaceholder extends FormattingPlaceholder {
            type: FormattingPlaceholderType.Group;
        }

        export interface FormattingSlicePlaceholder extends FormattingPlaceholder {
            type: FormattingPlaceholderType.Slice;
        }

        export const enum FormattingPlaceholderSource {
            Host = 'host',
            Visual = 'visual',
        }

        // Host placeholders are placeholders that use data provided by the host (Minerva, aka Visual Container properties)

        export const enum HostFormattingCardPlaceholderName {
            Actions = 'actions',
        }

        // No placeholders of these types yet
        export type HostFormattingGroupPlaceholderName = never;
        export type HostFormattingSlicePlaceholderName = never;

        export interface HostFormattingPlaceholder extends FormattingPlaceholder {
            source: FormattingPlaceholderSource.Host;
        }

        export interface HostFormattingCardPlaceholder extends HostFormattingPlaceholder {
            type: FormattingPlaceholderType.Card;
            name: HostFormattingCardPlaceholderName;
        }

        export interface HostFormattingGroupPlaceholder extends HostFormattingPlaceholder {
            type: FormattingPlaceholderType.Group;
            name: HostFormattingGroupPlaceholderName;
        }

        export interface HostFormattingSlicePlaceholder extends HostFormattingPlaceholder {
            type: FormattingPlaceholderType.Slice;
            name: HostFormattingSlicePlaceholderName;
        }

        // Visual placeholders that use data provided by the visual

        export type VisualFormattingCardPlaceholderName = never;
        export type VisualFormattingGroupPlaceholderName = never;
        export const enum VisualFormattingSlicePlaceholderName {
            DataVolume = 'dataVolume',
            Responsive = 'responsive',
        }

        export interface VisualFormattingPlaceholder extends FormattingPlaceholder {
            source: FormattingPlaceholderSource.Visual;
        }

        export interface VisualFormattingCardPlaceholder extends VisualFormattingPlaceholder {
            type: FormattingPlaceholderType.Card;
            name: VisualFormattingCardPlaceholderName;
        }

        export interface VisualFormattingGroupPlaceholder extends VisualFormattingPlaceholder {
            type: FormattingPlaceholderType.Group;
            name: VisualFormattingGroupPlaceholderName;
        }

        export interface VisualFormattingSlicePlaceholder extends VisualFormattingPlaceholder {
            type: FormattingPlaceholderType.Slice;
            name: VisualFormattingSlicePlaceholderName;
        }

        export interface ResolvedFormattingPlaceholder<TFormattingPlaceholder extends FormattingPlaceholder> {
            item: TFormattingPlaceholder extends FormattingCardPlaceholder
            ? FormattingCard
            : TFormattingPlaceholder extends FormattingGroupPlaceholder
            ? FormattingGroup
            : TFormattingPlaceholder extends FormattingSlicePlaceholder
            ? FormattingSlice
            : never;
            revertToDefaultDescriptors?: FormattingDescriptor[];
        }


        /**
         * Takes in a group of controls (ex. Simple or Composite).
         * Creates a dictionary where the key is the control name.
         * The value is an object with property `type` typed to match to the control name,
         * as well as a `properties` property that is set to the properties of the control.
         *
         * Note that this returns a dictionary containing all the controls included in `TControlGroupType`
         */
        type AllControls<TControlGroupType> = {
            [ControlName in keyof TControlGroupType]: {
                type: ControlName;
                properties: TControlGroupType[ControlName];
            }
        };

        /**
         * Returns an object with property `type` typed to match the control name,
         * and property `properties` containing the properties for the control.
         *
         * This indexes into the dictionary generated by `AllControls` to return a union of all possible controls instead of a dictionary.
         */
        export type FormattingControls<TControlGroupType> = AllControls<TControlGroupType>[keyof TControlGroupType];

        export type FormattingComponentType = SimpleComponentType & CompositeComponentType;

        /** Generates a union of all possible types of the controls in the given Component Group */
        export type ControlType<TComponentGroupType> = { [ControlName in keyof TComponentGroupType]: TComponentGroupType[ControlName] }[keyof TComponentGroupType];
        /** Defines an interface where the value of a `CompositeComponent`'s properties must be a `SimpleComponent`. */
        type CompositeComponentPropertyType = { [key: string]: ControlType<SimpleComponentType> | undefined };

        export type FormattingSimpleControl = FormattingControls<SimpleComponentType>;
        export type FormattingCompositeControl = FormattingControls<CompositeComponentType>;

        export type FormattingControl = FormattingSimpleControl | FormattingCompositeControl;

        export const enum FormattingComponent {
            AlignmentGroup = "AlignmentGroup",
            ColorPicker = "ColorPicker",
            ConditionalFormattingControl = "ConditionalFormattingControl",
            DatePicker = "DatePicker",
            Dropdown = "Dropdown",
            DurationPicker = "DurationPicker",
            EmptyControl = "EmptyControl",
            ErrorRangeControl = "ErrorRangeControl",
            FieldPicker = "FieldPicker",
            FlagsSelection = "FlagsSelection",
            FontControl = "FontControl",
            FontPicker = "FontPicker",
            GradientBar = "GradientBar",
            ImageUpload = "ImageUpload",
            Link = "Link",
            ListEditor = "ListEditor",
            MarginPadding = "MarginPadding",
            NumUpDown = "NumUpDown",
            ReadOnlyText = "ReadOnlyText",
            SeriesDialogLink = "SeriesDialogLink",
            ShapeMapSelector = "ShapeMapSelector",
            Slider = "Slider",
            TextArea = "TextArea",
            TextInput = "TextInput",
            ToggleSwitch = "ToggleSwitch",
        }

        export type SimpleComponentType = {
            AlignmentGroup: AlignmentGroup;
            ColorPicker: ColorPicker;
            ConditionalFormattingControl: ConditionalFormattingControl;
            DatePicker: DatePicker;
            Dropdown: Dropdown;
            DurationPicker: DurationPicker;
            ErrorRangeControl: ErrorRangeControl;
            EmptyControl: EmptyControl;
            FieldPicker: FieldPicker;
            FlagsSelection: FlagsSelection;
            FontPicker: FontPicker;
            GradientBar: GradientBar;
            ImageUpload: ImageUpload;
            Link: Link;
            ListEditor: ListEditor;
            NumUpDown: NumUpDown;
            ReadOnlyText: ReadOnlyText;
            SeriesDialogLink: SeriesDialogLink;
            ShapeMapSelector: ShapeMapSelector;
            Slider: Slider;
            TextArea: TextArea;
            TextInput: TextInput;
            ToggleSwitch: ToggleSwitch;
        };

        export type CompositeComponentType = {
            FontControl: FontControl;
            MarginPadding: MarginPadding;
        };

        export interface SimpleComponentBase<T> {
            descriptor: FormattingDescriptor;
            value: T;
        }

        export const enum ValidatorType {
            Min = 0,
            Max = 1,
            Required = 2,
        }

        export interface Validator {
            type: ValidatorType;
        }

        export interface MinValidator<T> extends Validator {
            type: ValidatorType.Min;
            value: T;
        }

        export interface MaxValidator<T> extends Validator {
            type: ValidatorType.Max;
            value: T;
        }

        export interface RequiredValidator extends Validator {
            type: ValidatorType.Required;
        }

        interface ColorPicker extends SimpleComponentBase<ThemeColorData> {
            defaultColor?: ThemeColorData;
            isNoFillItemSupported?: boolean;
        }
        interface MarginPadding extends CompositeComponentPropertyType {
            left: NumUpDown;
            right: NumUpDown;
            top: NumUpDown;
            bottom: NumUpDown;
        }

        export interface NumUpDownFormat extends NumUpDownValidators {
            unitSymbol?: string;
            unitSymbolAfterInput?: boolean;
        }

        interface NumUpDownValidators {
            minValue?: MinValidator<number>;
            maxValue?: MaxValidator<number>;
            required?: RequiredValidator;
        }

        interface NumUpDown extends SimpleComponentBase<number> {
            options?: NumUpDownFormat;
            placeholderText?: string;
        }

        interface NumUpDownWithoutUnit extends NumUpDown {
            options?: NumUpDownValidators;
        }

        interface FieldPicker extends SimpleComponentBase<data.ISQExpr[]> {
            validators: powerbi.explore.directives.ValidationInfo;
            allowMultipleValues?: boolean;
        }

        /** Error-range settings. Value is intentionally undefined as it can only be data-bound */
        interface ErrorRangeControl extends SimpleComponentBase<undefined> {
            validators: powerbi.explore.directives.ValidationInfo;

            // Other aspects of the Error Range settings the Visual can customize (e.g. allow relative values, allow 1-sided bounds, .. etc)
        }

        interface FontControl extends CompositeComponentPropertyType {
            fontFamily: FontPicker;
            fontSize: NumUpDownWithoutUnit;
            bold?: ToggleButton;
            italic?: ToggleButton;
            underline?: ToggleButton;
        }

        interface FontPicker extends SimpleComponentBase<string> { }

        interface ToggleButton extends SimpleComponentBase<boolean> { }

        interface ToggleSwitch extends SimpleComponentBase<boolean> { }

        interface TextValidators {
            required?: RequiredValidator;
        }
        interface TextInput extends SimpleComponentBase<string> {
            placeholder: string;
            validators?: TextValidators;
        }

        interface TextArea extends TextInput { }

        export const enum AlignmentGroupMode {
            Horizonal = 'horizontalAlignment',
            Vertical = 'verticalAlignment',
        }

        interface AlignmentGroup extends SimpleComponentBase<string> {
            mode: AlignmentGroupMode;
            supportsNoSelection?: boolean;
        }

        interface Slider extends NumUpDown { }
        interface ItemFlagsSelection extends SimpleComponentBase<string> {
            items: IEnumMember[];
        }
        interface AutoFlagsSelection extends SimpleComponentBase<EnumMemberValue> { }

        type FlagsSelection = ItemFlagsSelection | AutoFlagsSelection;

        type Dropdown = ItemDropdown | AutoDropdown;

        interface ItemDropdown extends SimpleComponentBase<IEnumMember> {
            items: IEnumMember[];
        }

        /**
        * Automatically generates items based on the property's type
        */
        interface AutoDropdown extends SimpleComponentBase<EnumMemberValue> {
            /** Values to add should be merged with the items */
            mergeValues?: IEnumMember[];
            /** Values to filter the list of items by */
            filterValues?: EnumMemberValue[];
        }

        export interface ListEditorValue {
            items: ListItemEditorValue[];
            selectedItem: ListItemEditorValue;
        }

        export interface ListItemEditorValue extends IEnumMember {
            update?: ListEditorItemUpdateType;
            oldDisplayName?: data.DisplayNameGetter;
        }

        export const enum ListEditorItemUpdateType {
            New = "New",
            Removed = "Removed",
            DisplayNameUpdated = "DisplayNameUpdated",
        }

        interface ListEditor extends SimpleComponentBase<ListEditorValue> { }

        interface ImageUpload extends SimpleComponentBase<ImageValue> { }

        interface DurationPicker extends SimpleComponentBase<string> {
            /** These are specfic to this control */
            validators?: {
                min?: string;
                max?: string;
                integer?: boolean;
            };
        }

        /** This will be used for showing only "fx" button without any other content */
        interface EmptyControl extends SimpleComponentBase<void> { }

        interface GradientBar extends SimpleComponentBase<string> { }

        interface ShapeMapSelector extends SimpleComponentBase<GeoJson> {
            isAzMapReferenceSelector?: boolean;
        }

        interface DatePicker extends SimpleComponentBase<Date> {
            placeholder: string;
            validators?: {
                max?: MaxValidator<Date>;
                min?: MinValidator<Date>;
            };
        }

        interface ReadOnlyText extends SimpleComponentBase<string> { }

        interface ConditionalFormattingControl extends SimpleComponentBase<powerbi.VisualObjectRepetition.VisualObjectRepetitionMetadata> {
            displayName: string;
        }

        interface Link extends SimpleComponentBase<() => (any | void)> {
            ariaLabel?: string;
        }

        interface SeriesDialogLink extends Link {
            type: FormattingComponent.SeriesDialogLink;
            warningIcon?: boolean;
            resetToDefaultDescriptors?: FormattingDescriptor[];
        }
    }
}

declare namespace powerbi {
    export interface ThemeColorData {
        value: string;
        id?: number;
        shade?: number;
    }
}

declare namespace powerbi {
    export interface ValidationRequiredInfo {
        required?: boolean;
    }

    export interface ValidationNumericInfo {
        decimal?: boolean;
        integer?: boolean;
        min?: number | Date | string;
        max?: number | Date | string;
    }
}

declare namespace powerbi.explore.directives {
    type ValidationAllInfo = powerbi.ValidationRequiredInfo & powerbi.ValidationNumericInfo;
    export interface ValidationInfo extends ValidationAllInfo {
        url?: boolean;
        field?: FieldValidationInfo;
    }

    export interface FieldValidationInfo {
        kind: data.FieldKind;
        // For more than 1 type to validate on, we can use Variant type descriptor
        type?: ValueTypeDescriptor;
    }
}

declare module powerbi {
    export interface IVisualErrorMessage {
        message: string;
        title: string;
        detail: string;
    }
    export interface IVisualWarning {
        code: string;
    }
}
