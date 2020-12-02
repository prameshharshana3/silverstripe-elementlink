<?php

namespace Silverstripers\ElementLink\Forms;

use SilverStripe\Admin\ModalController;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\Form;

/**
 * Decorates ModalController with insert element link
 * @see ModalController
 */
class ElementLinkModalExtension extends Extension
{
    private static $allowed_actions = [
        'EditorElementLink',
    ];

    /**
     * @return ModalController
     */
    public function getOwner()
    {
        /** @var ModalController $owner */
        $owner = $this->owner;
        return $owner;
    }


    /**
     * Form for inserting internal link pages
     *
     * @return Form
     */
    public function EditorElementLink()
    {
        $showLinkText = $this->getOwner()->getRequest()->getVar('requireLinkText');
        $factory = EditorElementLinkFormFactory::singleton();
        return $factory->getForm(
            $this->getOwner(),
            "EditorElementLink",
            ['RequireLinkText' => isset($showLinkText)]
        );
    }
}
