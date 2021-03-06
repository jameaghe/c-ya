<?php
/**
 * access keys template for cya classes.  copy one directory level up from
 * document root, name .cyaKeys.php, and fill in with access values.  this
 * obviously needs to be left blank on github to avoid sharing secrets.
 */

class cyaKeysDB {
  /**
   * hostname for database (often this is localhost)
   * @var string
   */
  const HOST = '';

  /**
   * name of database
   * @var string
   */
  const NAME = '';

  /**
   * username with access to the database
   * @var string
   */
  const USER = '';

  /**
   * password for user with access to the database
   * @var string
   */
  const PASS = '';
}
?>
