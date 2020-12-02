<?php
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;

call_user_func(function () {
    // Enable insert-link to element numbers
    TinyMCEConfig::get('cms')
        ->enablePlugins([
            'sslinkelement' => ModuleResourceLoader::resourceURL('silverstripers/silverstripe-elementlink:client/dist/js/TinyMCE_sslink-element.js'),
        ]);
});
