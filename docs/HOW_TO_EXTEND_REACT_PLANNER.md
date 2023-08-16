# Introduction

React-Planner can be extended in various way and we'll document each one of them and detail which part is availbalbe where.

# Common classes

## ReactPlannerConstants

Defines the different modes available during the execution of the application:

```typescript
// TODO(pg): describe the different modes
```

## ReactPlannerContext

The ReactPlannerContext is a React Context that is available to all the components of the application. It contains the following properties:

```typescript
// TODO(pg): describe the different properties
```


## ReactPlannerComponents

### ToolbarComponents,

New toolbar buttons can be integrated by adding them as a property of the <ReactPlanner> component like:

```typescript
    <ReactPlanner
        toolbarButtons={toolbarButtons}
    />
```

It can be created like:

```typescript
const {
  MODE_IDLE,
} = ReactPlannerConstants;

const { ToolbarButton } = ReactPlannerComponents.ToolbarComponents;

// TODO(pg): describe input parameters
export default function ScreenshotToolbarButton({ mode, state, key }) {
    // It can access the context:
    let context = useContext(ReactPlannerContext);


}
```	

### Content,

### SidebarComponents,

### FooterBarComponents,

### Viewer2DComponents,
### StyleComponents

### 

# How to extend React-Planner

## Catalog
> See [Create a Catalog](HOW_TO_CREATE_A_CATALOG.md)

## Element
> See [Create an Element](HOW_TO_CREATE_AN_ELEMENT.md)

## Plugin
> See [Create a Plugin](HOW_TO_CREATE_A_PLUGIN.md)

## Property Type
> See [Create a Property](HOW_TO_CREATE_A_PROPERTY.md)

## ToolbarButton
> See [Create a ToolbarButton](HOW_TO_CREATE_A_TOOLBAR_BUTTON.md)
