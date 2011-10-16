<?php
/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 * @version $Id: 1.4-rc1.php 4609 2011-04-30 01:46:23Z matt $
 *
 * @category Piwik
 * @package Updates
 */

/**
 * @package Updates
 */
class Piwik_Updates_1_4_rc1 extends Piwik_Updates
{
	static function getSql($schema = 'Myisam')
	{
		return array(
		    'ALTER TABLE `'. Piwik_Common::prefixTable('pdf') .'`
		    	ADD COLUMN `format` VARCHAR(10)' => false,
		    'UPDATE `'. Piwik_Common::prefixTable('pdf') .'`
		    	SET format = "pdf"' => false,
		);
	}

	static function update()
	{
		try {
			Piwik_Updater::updateDatabase(__FILE__, self::getSql());
		}
		catch(Exception $e){}
	}
}
