worldstate-tree-widget-wirecloud [![Build Status](http://ci.cismet.de/buildStatus/icon?job=worldstate-tree-widget-wirecloud)](https://ci.cismet.de/job/worldstate-tree-widget-wirecloud/)
==============================

Wrapper of the [Worldstate Tree (AngularJS)](https://github.com/crismaproject/worldstate-tree-widget-angular) to make it available on WireCloud.

## Get started

Simply download the binary from [here](http:crisma.cismet.de/lib/wirecloud/crisma-worldstate-tree-widget-wirecloud.wgt). Then upload the widget to your local marketplace of the WireCloud platform that you want to use.

You can also build the widget from scratch. The project uses [npm](https://www.npmjs.org/)/[bower](http://bower.io/)/[grunt](http://gruntjs.com/) for project management. Follow [these instructions](https://gist.github.com/mscholl/a0aef5a8c6664dc275b5) on how to build such a project.

## Configuration

```xml

    <Platform.Preferences>
        <Preference 
            name="DEBUG" 
            type="text" 
            description="Toggle debug mode" 
            label="DEBUG toggle"
            default="false"/>
        <Preference 
            name="CRISMA_DOMAIN" 
            type="text" 
            description="The CRISMA domain this widget lives in" 
            label="CRISMA domain" 
            default="CRISMA"/>
        <Preference 
            name="CRISMA_ICMM_API" 
            type="text" 
            description="The URL to the ICMM API instance" 
            label="CRISMA ICMM API" 
            default="http://crisma.cismet.de/icmm_api"/>
        <Preference 
            name="IMAGE_PATH" 
            type="text" 
            description="The URL to the images of the tree icons, may be absolute" 
            label="Tree icon image path" 
            default="./images/"/>
        <Preference 
            name="LEAF_ICON" 
            type="text" 
            description="The name to the image of the tree leaf icon, relative to IMAGE_PATH" 
            label="Tree leaf icon name" 
            default="world_leaf_16.png"/>
        <Preference 
            name="FOLDER_ICON_CLOSED" 
            type="text" 
            description="The name to the image of the tree folder icon when it is closed, relative to IMAGE_PATH" 
            label="Tree folder closed icon name" 
            default="world_16.png"/>
        <Preference 
            name="FOLDER_ICON_OPEN" 
            type="text" 
            description="The name to the image of the tree folder icon when it is open, relative to IMAGE_PATH" 
            label="Tree folder open icon name" 
            default="world_16.png"/>
        <Preference 
            name="MULTI_SELECT" 
            type="text" 
            description="If the tree enables multi selection or not, true or false" 
            label="Tree multi selection enable" 
            default="true"/>
        <Preference 
            name="OPEN_FOLDER_ON_CLICK" 
            type="text" 
            description="If folders shall be opened/closed on click, true or false" 
            label="Folder open/close on click enable" 
            default="false"/>
    </Platform.Preferences>
  
```

## Interface

```xml

    <Platform.Wiring>
        <InputEndpoint
            name="setSelectedWorldstates"
            type="text"
            label="Select worldstates"
            description="Let's other widgets select specific worldstates. The text has to be an array of worldstate ids only so every widget has to agree on a single ICMS instance"
            friendcode="selectedWorldstates"/>
        <InputEndpoint
            name="setActiveWorldstate"
            type="text"
            label="Activate Worldstate"
            description="Let's other widgets select a specific active worldstate. The text has to be a simple worldstate id only so every widget has to agree on a single ICMS instance"
            friendcode="activeWorldstate"/>
        <OutputEndpoint
            name="getSelectedWorldstates"
            type="text"
            label="Get the currently selected worldstates"
            description="Let's other widgets know which worldstate is selected. The text is an array of worldstate ids only so every widget has to agree on a single ICMS instance"
            friendcode="selectedWorldstates"/>
        <OutputEndpoint
            name="getActiveWorldstate"
            type="text"
            label="Get the currently active worldstate"
            description="Let's other widgets know which worldstate is active. The text is a simple worldstate id only so every widget has to agree on a single ICMS instance"
            friendcode="activeWorldstate"/>
    </Platform.Wiring>
    
```


## LICENSING INFO: 

The <code>world_leaf_16.png</code> is a mashup of two icons created by Yusuke Kamiyamane 
(Leaf icon, http://p.yusukekamiyamane.com/) and FatCow Web Hosting (World icon, http://www.fatcow.com/) that are 
released under the [Creative Commons (Attribution 3.0) license] (http://creativecommons.org/licenses/by/3.0/legalcode).
The resulting icon is also released under this license. All other icons used in the widget are made available by 
(Bootstrap, http://getbootstrap.com) that in turn makes use of (Glyphicons, http://glyphicons.com/).
