<?php
/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 * @version $Id: 1.5-b5.php 4766 2011-05-22 20:00:44Z matt $
 *
 * @category Piwik
 * @package Updates
 */

/**
 * @package Updates
 */
class Piwik_Updates_1_5_b5 extends Piwik_Updates
{
	static function getSql($schema = 'Myisam')
	{
		return array(
			'CREATE TABLE `'. Piwik_Common::prefixTable('session') .'` (
								id CHAR(32) NOT NULL,
								modified INTEGER,
								lifetime INTEGER,
								data TEXT,
								PRIMARY KEY ( id )
								)  DEFAULT CHARSET=utf8' => false,
		);
	}

	static function update()
	{
		Piwik_Updater::updateDatabase(__FILE__, self::getSql());
	}
}
