<?php
require_once '../../vendor/autoload.php';

$dotenv = new Dotenv\Dotenv("../../");
$dotenv->load();

$loader = new Twig_Loader_Filesystem('../../build/templates');
if ($_ENV["LOCAL"] !== "true") {
	$twigOptions = array(
		'cache' => '../../storage/cache'
	);
} else {
	$twigOptions = array();
}
$twig = new Twig_Environment($loader, $twigOptions);

$template = $twig->load('projects.twig');

$projects = array(
	array(
		"name" => "AOK eGK Service",
		"url" => "https://service.nordost.aok.de/",
		"imageId" => "omc",
		"city" => "Berlin",
		"shortDescription" => "Service-App für die elektronische Gesundheitskarte",
		"backend" => "Laravel 5",
		"features" => array("Umsetzung als Single Page Application mit Vue.js", "Analyse-Dashboard mit Individualmetriken"),
		"colors" => array(
			"top" => "#CDDE66",
			"bottom" => "#407837",
			"fallback" => "#7CA633"
			)
		),
	array(
		"name" => "Hafendorf Plau am See",
		"url" => "https://plau-hafendorf.de",
		"imageId" => "hap",
		"city" => "Plau am See",
		"shortDescription" => "Ferienapartments im Hafendorf Plau am See",
		"backend" => "CraftCMS 2",
		"features" => array("Automatische Synchronisation der Apartments mit Channel Manager", "Anbindung an Buchungssystem"),
		"colors" => array(
			"top" => "#2A8691",
			"bottom" => "#2A6791",
			"fallback" => "#2A6791"
			)
		),
	array(
		"name" => "Marina Ahrndt Kuechendesign",
		"url" => "https://ma-kuechen.de",
		"imageId" => "mak",
		"city" => "Plau am See",
		"shortDescription" => "Dienstleistung für individuelle Küchenplanung",
		"backend" => "Vanilla PHP",
		"features" => array("Logodesign", "Visitenkarten", "Parallax", "handgezeichnete & animierte Icons"),
		"colors" => array(
			"top" => "#F6F2D9",
			"bottom" => "#EA4C4D",
			"fallback" => "#ED7670"
			)
		),
	array(
		"name" => "AOK Pflege Akademie",
		"url" => "https://pflegeakademie.aok.de",
		"imageId" => "apa",
		"city" => "Berlin",
		"shortDescription" => "Bildungseinrichtung der AOK Nordost",
		"backend" => "CraftCMS 2",
		"features" => array("Kurssuche mit API-Schnittstelle & VueJS"),
		"colors" => array(
			"bottom" => "#407837",
			"top" => "#CDDE66",
			"fallback" => "#7CA633"
			)
		),
	array(
		"name" => "Plauer SV Handball",
		"url" => "https://plau-handball.de",
		"imageId" => "psv",
		"city" => "Plau am See",
		"shortDescription" => "Handballverein in Plau am See ♥",
		"backend" => "WordPress",
		"features" => array("Logodesign"),
		"colors" => array(
			"top" => "#F8D3AE",
			"bottom" => "#9CBAD7",
			"fallback" => "#ED7670"
			)
		),
	);

$data = array(
	'title' => 'Rostock Ahoi | Projekte',
	'bodyClass' => 'projects-page',
	'projects' => $projects,
	'env' => $_ENV
	);

echo $template->render($data);

?>
