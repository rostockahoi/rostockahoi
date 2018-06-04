<?php
require_once '../vendor/autoload.php';

$dotenv = new Dotenv\Dotenv("../");
$dotenv->load();

$loader = new Twig_Loader_Filesystem('../build/templates');
if ($_ENV["LOCAL"] !== "true") {
	$twigOptions = array(
		'cache' => '../storage/cache'
	);
} else {
	$twigOptions = array();
}
$twig = new Twig_Environment($loader, $twigOptions);

$template = $twig->load('index.twig');

$data = array(
	'title' => 'Rostock Ahoi | Web, Design, Entwicklung',
	'bodyClass' => 'home',
	'env' => $_ENV
	);

echo $template->render($data);

?>
