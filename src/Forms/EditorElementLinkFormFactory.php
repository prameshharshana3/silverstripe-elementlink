<?php

namespace Silverstripers\ElementLink\Forms;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Admin\Forms\LinkFormFactory;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\RequiredFields;
use SilverStripe\Forms\TextField;
use Silverstripers\Gorilla\Extension\BaseElementExtension;

class EditorElementLinkFormFactory extends LinkFormFactory
{
    private static $has_one = [
        'Element' => BaseElement::class,
        'Page' => \Page::class,
    ];

    protected function getFormFields($controller, $name, $context)
    {
        $fields = FieldList::create([

            DropdownField::create('Link', 'Element on this website')
                ->setSource(
                    BaseElementExtension::get_all_elements_links()
                ),
            TextField::create(
                'Description',
                _t(__CLASS__ . '.LINKDESCR', 'Link description')
            ),
        ]);

        if ($context['RequireLinkText']) {
            $fields->insertAfter('Link', TextField::create('Text', _t(__CLASS__ . '.LINKTEXT', 'Link text')));
        }

        return $fields;
    }

    protected function getValidator($controller, $name, $context)
    {
        if ($context['RequireLinkText']) {
            return RequiredFields::create('Text');
        }

        return null;
    }

}
