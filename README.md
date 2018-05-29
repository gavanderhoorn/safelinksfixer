Outlook wraps URLS in emails so that they go through their URL "protection"
scheme, called [ATP Safe Links](https://support.office.com/en-us/article/office-365-atp-safe-links-dd6a1fef-ec4a-4cf4-a25a-bb591c5811e3#atpforemail).

The problem is that this makes URLs in emails very long when using Thunderbird 
and this makes it harder to figure out where they point to. This addon 
replaces the Safe Link URL with a direct link to the URL target, thereby 
bypassing the URL "protection".

This code is based on the 
[SmileyFixer](https://addons.mozilla.org/en-GB/thunderbird/addon/smiley-fixer/) 
Thunderbird Addon.

Installation instructions
-------------------------

Clone the repository locally then run `make`

    $ git clone https://github.com/GjjvdBurg/safelinksfixer.git
    $ cd safelinksfixer
    $ make

Install the resulting xpi file in Thunderbird 3+ from the Add-ons menu
option.

This add-on is also available from the Mozilla Add-ons site.

https://addons.mozilla.org/en-US/thunderbird/addon/smiley-fixer/

License
-------

All code is covered by the Apache version 2.0 license.

http://www.apache.org/licenses/LICENSE-2.0.html
