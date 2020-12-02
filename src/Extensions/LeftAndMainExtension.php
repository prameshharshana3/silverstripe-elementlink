<?php

namespace Silverstripers\ElementLink\Extensions;

use SilverStripe\Core\Extension;

class LeftAndMainExtension extends Extension
{
    public function updateClientConfig(&$config)
    {
        $config['form']['EditorElementLink'] = [
            'schemaUrl' => $this->getOwner()->Link('methodSchema/Modals/EditorElementLink'),
        ];
    }
}
