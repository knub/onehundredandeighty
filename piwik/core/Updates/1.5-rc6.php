<?php
/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 * @version $Id: 1.5-rc6.php 4861 2011-06-04 01:27:36Z matt $
 *
 * @category Piwik
 * @package Updates
 */

/**
 * @package Updates
 */
class Piwik_Updates_1_5_rc6 extends Piwik_Updates
{
	static function update()
	{
		try {
			Piwik_PluginsManager::getInstance()->activatePlugin('PrivacyManager');
		} catch(Exception $e) {
		}
	}
}

