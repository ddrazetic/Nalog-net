-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 13, 2021 at 12:32 PM
-- Server version: 10.0.38-MariaDB-0+deb8u1
-- PHP Version: 5.6.40-0+deb8u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `feritweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `putni_nalozi_drzave`
--

CREATE TABLE IF NOT EXISTS `putni_nalozi_drzave` (
`id` int(11) NOT NULL,
  `naziv` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `naziv_eng` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dnevnice` decimal(10,2) NOT NULL,
  `valuta` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `prioritet` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=246 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `putni_nalozi_drzave`
--

INSERT INTO `putni_nalozi_drzaves` (`id`, `naziv`, `naziv_eng`, `dnevnice`, `valuta`, `prioritet`) VALUES
(1, 'AFGANISTAN Prijelazna Islamska Država Afganistan', 'AFGHANISTAN The Transitional Islamic State of Afghanistan', 35.00, 'USD', 0),
(2, 'ALBANIJA Republika Albanija', 'ALBANIA Republic of Albania', 30.00, 'EUR', 0),
(3, 'ALŽIR Demokratska Narodna Republika Alžir', 'ALGERIA People''s Democratic Republic of Algeria', 40.00, 'USD', 0),
(4, 'AMERIČKA SAMOA', 'AMERICAN SAMOA', 35.00, 'USD', 0),
(5, 'AMERIČKI DJEVIČANSKI OTOCI', 'VIRGIN ISLANDS, U.S. Virgin Islands of the United States', 35.00, 'USD', 0),
(6, 'ANDORA Kneževina Andora', 'ANDORRA Principality of Andorra', 70.00, 'USD', 0),
(7, 'ANGOLA Republika Angola', 'ANGOLA Republic of Angola', 35.00, 'USD', 0),
(8, 'ANGUILLA', 'ANGUILLA', 35.00, 'USD', 0),
(9, 'ANTARKTIKA', 'ANTARCTICA', 35.00, 'USD', 0),
(10, 'ANTIGVA I BARBUDA', 'ANTIGUA AND BARBUDA', 35.00, 'USD', 0),
(11, 'ARGENTINA Republika Argentina', 'ARGENTINA Argentine Republic', 50.00, 'USD', 0),
(12, 'ARMENIJA Republika Armenija', 'ARMENIA Republic of Armenia', 50.00, 'USD', 0),
(13, 'ARUBA', 'ARUBA', 35.00, 'USD', 0),
(14, 'AUSTRALIJA', 'AUSTRALIA', 85.00, 'USD', 0),
(15, 'AUSTRIJA Republika Austrija', 'AUSTRIA Republic of Austria', 70.00, 'EUR', 0),
(16, 'AZERBAJDŽAN Republika Azerbajdžan', 'AZERBAIJAN Republic of Azerbaijan', 50.00, 'USD', 0),
(17, 'BAHAMI Bahamska Zajednica', 'BAHAMAS Commonwealth of the Bahamas', 35.00, 'USD', 0),
(18, 'BAHREIN Kraljevina Bahrein', 'BAHRAIN Kingdom of Bahrain', 35.00, 'USD', 0),
(19, 'BANGLADEŠ Narodna Republika Bangladeš', 'BANGLADESH People''s Republic of Bangladesh', 35.00, 'USD', 0),
(20, 'BARBADOS', 'BARBADOS', 35.00, 'USD', 0),
(21, 'BELGIJA Kraljevina Belgija', 'BELGIUM Kingdom of Belgium', 70.00, 'EUR', 0),
(22, 'BELIZE', 'BELIZE', 35.00, 'USD', 0),
(23, 'BENIN Republika Benin', 'BENIN Republic of Benin', 35.00, 'USD', 0),
(24, 'BERMUDI', 'BERMUDA', 35.00, 'USD', 0),
(25, 'BJELOKOSNA OBALA Republika Bjelokosna Obala', 'COTE D''IVOIRE Republic of Cote d''Ivoire', 35.00, 'USD', 0),
(26, 'BJELORUSIJA Republika Bjelorusija', 'BELARUS Republic of Belarus', 50.00, 'USD', 0),
(27, 'BOCVANA Republika Bocvana', 'BOTSWANA Republic of Botswana', 35.00, 'USD', 0),
(28, 'BOLIVIJA Republika Bolivija', 'BOLIVIA Republic of Bolivia', 40.00, 'USD', 0),
(29, 'BOSNA I HERCEGOVINA', 'BOSNIA AND HERZEGOVINA', 30.00, 'EUR', 0),
(30, 'BOŽIĆNI OTOK', 'CHRISTMAS ISLAND', 35.00, 'USD', 0),
(31, 'BRAZIL Savezna Republika Brazil', 'BRAZIL Federative Republic of Brazil', 40.00, 'USD', 0),
(32, 'BRITANSKI DJEVIČANSKI OTOCI', 'VIRGIN ISLANDS, BRITISH British Virgin Islands', 35.00, 'USD', 0),
(33, 'BRITANSKI INDIJSKOOCEANSKI TERITORIJ', 'BRITISH INDIAN OCEAN TERRITORY', 35.00, 'USD', 0),
(34, 'BRUNEJ Brunej Darussalam', 'BRUNEI DARUSSALAM', 35.00, 'USD', 0),
(35, 'BUGARSKA Republika Bugarska', 'BULGARIA Republic of Bulgaria', 40.00, 'EUR', 0),
(36, 'BURKINA FASO', 'BURKINA FASO', 35.00, 'USD', 0),
(37, 'BURUNDI Republika Burundi', 'BURUNDI Republic of Burundi', 35.00, 'USD', 0),
(38, 'BUTAN Kraljevina Butan', 'BHUTAN Kingdom of Bhutan', 35.00, 'USD', 0),
(39, 'CIPAR Republika Cipar', 'CYPRUS Republic of Cyprus', 60.00, 'EUR', 0),
(40, 'CRNA GORA', 'MONTENEGRO', 35.00, 'USD', 0),
(41, 'ČAD Republika Ćad', 'CHAD Republic of Chad', 35.00, 'USD', 0),
(42, 'ČEŠKA Republika Češka', 'CZECH REPUBLIC', 50.00, 'EUR', 0),
(43, 'ČILE Republika Čile', 'CHILE Republic of Chile', 40.00, 'USD', 0),
(44, 'DANSKA Kraljevina Danska', 'DENMARK Kingdom of Denmark', 70.00, 'EUR', 0),
(45, 'DOMINIKA Zajednica Dominika', 'DOMINICA Commonwealth of Dominica', 35.00, 'USD', 0),
(46, 'DOMINIKANSKA REPUBLIKA', 'DOMINICAN REPUBLIC', 35.00, 'USD', 0),
(47, 'DŽIBUTI Republika Džibuti', 'DJIBOUTI Republic of Djibouti', 35.00, 'USD', 0),
(48, 'EGIPAT Arapska Republika Egipat', 'EGYPT Arab Republic of Egypt', 40.00, 'USD', 0),
(49, 'EKVADOR Republika Ekvador', 'ECUADOR Republic of Ecuador', 35.00, 'USD', 0),
(50, 'EKVATORSKA GVINEJA Republika Ekvatorska Gvineja', 'EQUATORIAL GUINEA Republic of Equatorial Guinea', 35.00, 'USD', 0),
(51, 'ERITREJA', 'ERITREA', 35.00, 'USD', 0),
(52, 'ESTONIJA Republika Estonija', 'ESTONIA Republic of Estonia', 40.00, 'EUR', 0),
(53, 'ETIOPIJA Savezna Demokratska Republika Etiopija', 'ETHIOPIA Federal Democratic Republic of Ethiopia', 35.00, 'USD', 0),
(54, 'FALKLANDI (MALVINI)', 'FALKLAND ISLANDS (MALVINAS)', 35.00, 'USD', 0),
(55, 'FARSKI (OVČJI) OTOCI', 'FAROE ISLANDS', 35.00, 'USD', 0),
(56, 'FIDŽI Republika Fidžijski Otoci', 'FIJI Republic of the Fiji Islands', 35.00, 'USD', 0),
(57, 'FILIPINI Republika Filipini', 'PHILIPPINES Republic of the Philippines', 40.00, 'USD', 0),
(58, 'FINSKA Republika Finska', 'FINLAND Republic of Finland', 70.00, 'EUR', 0),
(59, 'FRANCUSKA Republika Francuska', 'FRANCE French Republic', 70.00, 'EUR', 0),
(60, 'FRANCUSKA GVAJANA', 'FRENCH GUIANA', 35.00, 'USD', 0),
(61, 'FRANCUSKI JUŠNI TERITORIJI', 'FRENCH SOUTHERN TERRITORIES', 35.00, 'USD', 0),
(62, 'FRANCUSKA POLINEZIJA', 'FRENCH POLYNESIA', 35.00, 'USD', 0),
(63, 'GABON Republika Gabon', 'GABON Gabonese Republic', 35.00, 'USD', 0),
(64, 'GAMBIJA Republika Gambija', 'GAMBIA Republic of the Gambia', 35.00, 'USD', 0),
(65, 'GANA Republika Gana', 'GHANA Republic of Ghana', 35.00, 'USD', 0),
(66, 'GIBRALTAR', 'GIBRALTAR', 35.00, 'USD', 0),
(67, 'GRČKA Republika Grčka', 'GREECE Hellenic Republic', 60.00, 'EUR', 0),
(68, 'GRENADA', 'GRENADA', 35.00, 'USD', 0),
(69, 'GRENLAND', 'GREENLAND', 35.00, 'USD', 0),
(70, 'GRUZIJA', 'GEORGIA', 50.00, 'USD', 0),
(71, 'GUAM', 'GUAM', 35.00, 'USD', 0),
(72, 'GUADELOUPE', 'GUADELOUPE', 35.00, 'USD', 0),
(73, 'GUERNSEY', 'GUERNSEY', 35.00, 'USD', 0),
(74, 'GVAJANA Republika Gvajana', 'GUYANA Republic of Guyana', 35.00, 'USD', 0),
(75, 'GVATEMALA Republika Gvatemala', 'GUATEMALA Republic of Guatemala', 35.00, 'USD', 0),
(76, 'GVINEJA Republika Gvineja', 'GUINEA Republic of Guinea', 35.00, 'USD', 0),
(77, 'GVINEJA BISAU Republika Gvineja Bisau', 'GUINEA-BISSAU Republic of Guinea-Bissau', 35.00, 'USD', 0),
(78, 'HAITI Republika Haiti', 'HAITI Republic of Haiti', 35.00, 'USD', 0),
(79, 'HONDURAS Republika Honduras', 'HONDURAS Republic of Honduras', 35.00, 'USD', 0),
(80, 'HONG KONG Kinesko Posebno Upravno Područje Hong Kong', 'HONG KONG Hong Kong Special Administrative Region of China', 95.00, 'USD', 0),
(81, 'HRVATSKA Republika Hrvatska', 'CROATIA Republic of Croatia', 200.00, 'HRK', 1000),
(82, 'INDIJA Republika Indija', 'INDIA Republic of India', 40.00, 'USD', 0),
(83, 'INDONEZIJA Republika Indonezija', 'INDONESIA Republic of Indonesia', 40.00, 'USD', 0),
(84, 'IRAK Republika Irak', 'IRAQ Republic of Iraq', 60.00, 'USD', 0),
(85, 'IRAN, ISLAMSKA REPUBLIKA Islamska Republika Iran', 'IRAN, ISLAMIC REPUBLIC OF Islamic Republic of Iran', 60.00, 'EUR', 0),
(86, 'IRSKA', 'IRELAND', 70.00, 'EUR', 0),
(87, 'ISLAND Republika Island', 'ICELAND Republic of Iceland', 80.00, 'EUR', 0),
(88, 'ITALIJA Republika Italija', 'ITALY Italian Republic', 70.00, 'EUR', 0),
(89, 'IZRAEL Država Izrael', 'ISRAEL State of Israel', 70.00, 'USD', 0),
(90, 'JAMAJKA', 'JAMAICA', 35.00, 'USD', 0),
(91, 'JAPAN', 'JAPAN', 85.00, 'USD', 0),
(92, 'JEMEN', 'YEMEN', 35.00, 'USD', 0),
(93, 'JERSEY', 'JERSEY', 35.00, 'USD', 0),
(94, 'JORDAN Hašemitska Kraljevina Jordan', 'JORDAN Hashemite Kingdom of Jordan', 35.00, 'USD', 0),
(95, 'JUŽNA DŽORDŽIJA I OTOCI JUŽNI SENDVIČ', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 35.00, 'USD', 0),
(96, 'JUŽNOAFRIČKA REPUBLIKA', 'SOUTH AFRICA Republic of South Africa', 50.00, 'USD', 0),
(97, 'KAJMANSKI OTOCI', 'CAYMAN ISLANDS', 35.00, 'USD', 0),
(98, 'KAMBODŽA Kraljevina Kambodža', 'CAMBODIA Kingdom of Cambodia', 35.00, 'USD', 0),
(99, 'KAMERUN Republika Kamerun', 'CAMEROON Republic of Cameroon', 35.00, 'USD', 0),
(100, 'KANADA', 'CANADA', 85.00, 'USD', 0),
(101, 'KATAR Država Katar', 'QATAR State of Qatar', 35.00, 'USD', 0),
(102, 'KAZAHSTAN Republika Kazahstan', 'KAZAKHSTAN Republic of Kazakhstan', 50.00, 'USD', 0),
(103, 'KENIJA Republika Kenija', 'KENYA Republic of Kenya', 35.00, 'USD', 0),
(104, 'KINA Narodna Republika Kina', 'CHINA People''s Republic of China', 50.00, 'USD', 0),
(105, 'KIRGISTAN Republika Kirgistan', 'KYRGYZSTAN Kyrgyz Republic', 50.00, 'USD', 0),
(106, 'KIRIBATI Republika Kiribati', 'KIRIBATI Republic of Kiribati', 35.00, 'USD', 0),
(107, 'KOKOSOVI OTOCI (KEELING)', 'COCOS (KEELING) ISLANDS', 35.00, 'USD', 0),
(108, 'KOLUMBIJA Republika Kolumbija', 'COLOMBIA Republic of Colombia', 40.00, 'USD', 0),
(109, 'KOMORI Komorski Savez', 'COMOROS Union of the Comoros', 35.00, 'USD', 0),
(110, 'KONGO Republika Kongo', 'CONGO Republic of the Congo', 35.00, 'USD', 0),
(111, 'KONGO, DEMOKRATSKA REPUBLIKA Demokratska Republika Kongo', 'CONGO, THE DEMOCRATIC REPUBLIC OF THE The Democratic Republic of the Congo', 35.00, 'USD', 0),
(112, 'KOREJA, DEMOKRATSKA NARODNA REPUBLIKA Demokratska Narodna Republika Koreja', 'KOREA, DEMOCRATIC PEOPLE''S REPUBLIC OF Democratic People''s Republic Republic of Korea', 40.00, 'USD', 0),
(113, 'KOREJA, Republika Koreja', 'KOREA, REPUBLIC OF Republic of Korea', 70.00, 'USD', 0),
(114, 'KOSTARIKA Republika Kostarika', 'COSTA RICA Republic of Costa Rica', 35.00, 'USD', 0),
(115, 'KUBA Republika Kuba', 'CUBA Republic of Cuba', 35.00, 'USD', 0),
(116, 'KUKOVI OTOCI', 'COOK ISLANDS', 35.00, 'USD', 0),
(117, 'KUVAJT Država Kuvajt', 'KUWAIT State of Kuwait', 70.00, 'USD', 0),
(118, 'LAOS, NARODNA DEMOKRATSKA REPUBLIKA', 'LAO, PEOPLE''S DEMOCRATIC REPUBLIC', 35.00, 'USD', 0),
(119, 'LESOTO Kraljevina Lesoto', 'LESOTHO Kingdom of Lesotho', 35.00, 'USD', 0),
(120, 'LETONIJA Republika Letonija', 'LATVIA Republic of Latvia', 40.00, 'EUR', 0),
(121, 'LIBANON Republika Libanon', 'LEBANON Lebanese Republic', 35.00, 'USD', 0),
(122, 'LIBERIJA Republika Liberija', 'LIBERIA Republic of Liberia', 40.00, 'USD', 0),
(123, 'LIBIJA Socijalistička Narodna Libijska Arapska Džamahirija', 'LIBYAN ARAB JAMAHIRIYA Socialist People''s Libyan Arab Jamahiriya', 40.00, 'USD', 0),
(124, 'LIHTENŠTAJN Kneževina Lihtenštajn', 'LIECHTENSTEIN Principality of Liechtenstein', 35.00, 'USD', 0),
(125, 'LITVA Republika Litva', 'LITHUANIA Republic of Lithuania', 40.00, 'EUR', 0),
(126, 'LUKSEMBURG Veliko Vojvodstvo Luksemburg', 'LUXEMBOURG Grand Duchy of Luxembourg', 80.00, 'EUR', 0),
(127, 'MADAGASKAR Republika Madagaskar', 'MADAGASCAR Republic of Madagascar', 35.00, 'USD', 0),
(128, 'MAĐARSKA Republika Mađarska', 'HUNGARY Republic of Hungary', 50.00, 'EUR', 0),
(129, 'MAKAO Kinesko Posebno Upravno Područje Makao', 'MACAO Macao Special Administrative Region of China', 35.00, 'USD', 0),
(130, 'MAKEDONIJA Republika Makedonija', 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF The former Yugoslav Republic of Macedonia', 30.00, 'EUR', 0),
(131, 'MALAVI Republika Malavi', 'MALAWI Republic of Malawi', 35.00, 'USD', 0),
(132, 'MALDIVI Republika Maldivi', 'MALDIVES Republic of Maldives', 35.00, 'USD', 0),
(133, 'MALEZIJA', 'MALAYSIA', 40.00, 'USD', 0),
(134, 'MALI Republika Mali', 'MALI Republic of Mali', 35.00, 'USD', 0),
(135, 'MALTA Republika Malta', 'MALTA Republic of Malta', 60.00, 'EUR', 0),
(136, 'MAROKO Kraljevina Maroko', 'MOROCCO Kingdom of Morocco', 35.00, 'USD', 0),
(137, 'MARŠALOVI OTOCI Republika Maršalovi Otoci', 'MARSHALL ISLANDS Republic of the Marshall Islands', 35.00, 'USD', 0),
(138, 'MARTINIQUE', 'MARTINIQUE', 35.00, 'USD', 0),
(139, 'MAURICIJUS Republika Mauricijus', 'MAURITIUS Republic of Mauritius', 35.00, 'USD', 0),
(140, 'MAURITANIJA Islamska Republika Mauritanija', 'MAURITANIA Islamic Republic of Mauritania', 35.00, 'USD', 0),
(141, 'MAYOTTE', 'MAYOTTE', 35.00, 'USD', 0),
(142, 'MEKSIKO Sjedinjene Meksičke Države', 'MEXICO United Mexican States', 35.00, 'USD', 0),
(143, 'MIJANMAR Mijanmarska Unija', 'MYANMAR Union of Myanmar', 35.00, 'USD', 0),
(144, 'MIKRONEZIJA, SAVEZNE DRŽAVE Savezne Države Mikronezije', 'MICRONESIA, FEDERATED STATES OF Federated States of Micronesia', 35.00, 'USD', 0),
(145, 'MOLDAVIJA, REPUBLIKA Republika Moldavija', 'MOLDOVA, REPUBLIC OF Republic of Moldova', 40.00, 'USD', 0),
(146, 'MONAKO Kneževina Monako', 'MONACO Principality of Monaco', 70.00, 'EUR', 0),
(147, 'MONGOLIJA', 'MONGOLIA', 35.00, 'USD', 0),
(148, 'MONTSERRAT', 'MONTSERRAT', 35.00, 'USD', 0),
(149, 'MOZAMBIK Republika Mozambik', 'MOZAMBIQUE Republic of Mozambique', 35.00, 'USD', 0),
(150, 'NAMIBIJA Republika Namibija', 'NAMIBIA Republic of Namibia', 35.00, 'USD', 0),
(151, 'NAURU Republika Nauru', 'NAURU Republic of Nauru', 35.00, 'USD', 0),
(152, 'NEPAL Kraljevina Nepal', 'NEPAL Kingdom of Nepal', 35.00, 'USD', 0),
(153, 'NIGER Republika Niger', 'NIGER Republic of the Niger', 35.00, 'USD', 0),
(154, 'NIGERIJA Savezna Republika Nigerija', 'NIGERIA Federal Republic of Nigeria', 35.00, 'EUR', 0),
(155, 'NIKARAGVA Republika Nikaragva', 'NICARAGUA Republic of Nicaragua', 35.00, 'USD', 0),
(156, 'NIUE Republika Niue', 'NIUE Republic of Niue', 35.00, 'USD', 0),
(157, 'NIZOZEMSKA Kraljevina Nizozemska', 'NETHERLANDS Kingdom of the Netherlands', 70.00, 'USD', 0),
(158, 'NIZOZEMSKI ANTILI', 'NETHERLANDS ANTILLES', 35.00, 'USD', 0),
(159, 'NORVEŠKA Kraljevina Norveška', 'NORWAY Kingdom of Norway', 80.00, 'EUR', 0),
(160, 'NOVA KALEDONIJA', 'NEW CALEDONIA', 35.00, 'USD', 0),
(161, 'NOVI ZELAND', 'NEW ZEALAND', 70.00, 'USD', 0),
(162, 'NJEMAČKA Savezna Republika Njemačka', 'GERMANY Federal Republic of Germany', 70.00, 'EUR', 0),
(163, 'OMAN Sultanat Oman', 'OMAN Sultanate of Oman', 35.00, 'USD', 0),
(164, 'OTOCI ALAND', 'ALAND ISLANDS', 35.00, 'USD', 0),
(165, 'OTOCI TURKS I CAICOS', 'TURKS AND CAICOS ISLANDS', 35.00, 'USD', 0),
(166, 'OTOK BOUVET', 'BOUVET ISLAND', 35.00, 'USD', 0),
(167, 'OTOK HEARD I OTOCI MCDONALD', 'HEARD ISLAND AND MCDONALD ISLANDS', 35.00, 'USD', 0),
(168, 'OTOK MAN', 'ISLE OF MAN', 35.00, 'USD', 0),
(169, 'OTOK NORFOLK', 'NORFOLK ISLAND', 35.00, 'USD', 0),
(170, 'PAKISTAN Islamska Republika Pakistan', 'PAKISTAN Islamic Republic of Pakistan', 40.00, 'USD', 0),
(171, 'PALAU Republika Palau', 'PALAU Republic of Palau', 35.00, 'USD', 0),
(172, 'PALESTINSKO PODRUČJE, OKUPIRANO Okupirano Palestinsko Područje', 'PALESTINIAN TERRITORY, OCCUPIED Occupied Palestinian Territory', 35.00, 'USD', 0),
(173, 'PANAMA Republika Panama', 'PANAMA Republic of Panama', 50.00, 'USD', 0),
(174, 'PAPUA NOVA GVINEJA', 'PAPUA NEW GUINEA', 35.00, 'USD', 0),
(175, 'PARAGVAJ Republika Paragvaj', 'PARAGUAY Republic of Paraguay', 35.00, 'USD', 0),
(176, 'PERU Republika Peru', 'PERU Republic of Peru', 35.00, 'USD', 0),
(177, 'PITCAIRN', 'PITCAIRN', 35.00, 'USD', 0),
(178, 'POLJSKA Republika Poljska', 'POLAND Republic of Poland', 40.00, 'EUR', 0),
(179, 'PORTORIKO', 'PUERTO RICO', 35.00, 'USD', 0),
(180, 'PORTUGAL Republika Portugal', 'PORTUGAL Portuguese Republic', 60.00, 'EUR', 0),
(181, 'REUNION', 'REUNION', 35.00, 'USD', 0),
(182, 'RUANDA Republika Ruanda', 'RWANDA Rwandese Republic', 35.00, 'USD', 0),
(183, 'RUMUNJSKA', 'ROMANIA', 40.00, 'EUR', 0),
(184, 'RUSIJA Ruska Federacija', 'RUSSIAN FEDERATION', 50.00, 'USD', 0),
(185, 'SAD Sjedinjene Američke Države', 'UNITED STATES United States of America', 95.00, 'USD', 0),
(186, 'SVETA HELENA', 'SAINT HELENA', 35.00, 'USD', 0),
(187, 'SVETI PETAR I MIKELON', 'SAINT PIERRE AND MIQUELON', 35.00, 'USD', 0),
(188, 'SALVADOR Republika Salvador', 'EL SALVADOR Republic of El Salvador', 35.00, 'USD', 0),
(189, 'SAMOA Nezavisna Država Samoa', 'SAMOA Independent State of Samoa', 35.00, 'USD', 0),
(190, 'SAN MARINO Republika San Marino', 'SAN MARINO Republic of San Marino', 35.00, 'USD', 0),
(191, 'SAUDIJSKA ARABIJA Kraljevina Saudijska Arabija', 'SAUDI ARABIA Kingdom of Saudi Arabia', 50.00, 'USD', 0),
(192, 'SEJŠELI Republika Sejšeli', 'SEYCHELLES Republic of Seychelles', 35.00, 'USD', 0),
(193, 'SENEGAL Republika Senegal', 'SENEGAL Republic of Senegal', 35.00, 'USD', 0),
(194, 'SIJERA LEONE Republika Sijera Leone', 'SIERRA LEONE Republic of Sierra Leone', 35.00, 'USD', 0),
(195, 'SINGAPUR Republika Singapur', 'SINGAPORE Republic of Singapore', 85.00, 'USD', 0),
(196, 'SIRIJA Sirijska Arapska Republika', 'SYRIAN ARAB REPUBLIC', 50.00, 'USD', 0),
(197, 'SJEVERNI MARIJANSKI OTOCI Zajednica Sjevernomarijanskih Otoka', 'NORTHERN MARIANA ISLANDS Commonwealth of the Northern Mariana Islands', 35.00, 'USD', 0),
(198, 'SLOVAČKA Republika Slovačka', 'SLOVAKIA Slovak Republic', 50.00, 'EUR', 0),
(199, 'SLOVENIJA Republika Slovenija', 'SLOVENIA Republic of Slovenia', 50.00, 'EUR', 0),
(200, 'SOLOMONSKI OTOCI', 'SOLOMON ISLANDS', 35.00, 'USD', 0),
(201, 'SOMALIJA Republika Somalija', 'SOMALIA Somali Republic', 35.00, 'USD', 0),
(202, 'SRBIJA', 'SERBIA', 30.00, 'EUR', 0),
(203, 'SRBIJA I CRNA GORA', 'SERBIA AND MONTENEGRO', 35.00, 'USD', 0),
(204, 'SREDNJOAFRIČKA REPUBLIKA', 'CENTRAL AFRICAN REPUBLIC', 35.00, 'USD', 0),
(205, 'SUDAN Republika Sudan', 'SUDAN Republic of the Sudan', 35.00, 'USD', 0),
(206, 'SURINAM Republika Surinam', 'SURINAME Republic of Suriname', 35.00, 'USD', 0),
(207, 'SVALBARD I JAN MAYEN', 'SVALBARD AND JAN MAYEN', 35.00, 'USD', 0),
(208, 'SVAZI Kraljevina Svazi', 'SWAZILAND Kingdom of Swaziland', 35.00, 'USD', 0),
(209, 'SVETA LUCIJA', 'SAINT LUCIA', 35.00, 'USD', 0),
(210, 'SVETA STOLICA (DRŽAVA VATIKANSKOG GRADA)', 'HOLY SEE (VATICAN CITY STATE)', 35.00, 'USD', 0),
(211, 'SVETI KRISTOFOR I NEVIS', 'SAINT KITTS AND NEVIS', 35.00, 'USD', 0),
(212, 'SVETI TOMA I PRINSIPE Demokratska Republika Sveti Toma i Prinsipe', 'SAO TOME AND PRINCIPE Democratic Republic of Sao Tome and Principe', 35.00, 'USD', 0),
(213, 'SVETI VINCENT I GRENADINI', 'SAINT VINCENT AND THE GRENADINES', 35.00, 'USD', 0),
(214, 'ŠPANJOLSKA Kraljevina Španjolska', 'SPAIN Kingdom of Spain', 60.00, 'EUR', 0),
(215, 'ŠRI LANKA Demokratska Socijalistička Republika Šri Lanka', 'SRI LANKA Democratic Socialist Republic of Sri Lanka', 35.00, 'USD', 0),
(216, 'ŠVEDSKA Kraljevina Švedska', 'SWEDEN Kingdom of Sweden', 80.00, 'EUR', 0),
(217, 'ŠVICARSKA Švicarska Konfederacija', 'SWITZERLAND Swiss Confederation', 80.00, 'EUR', 0),
(218, 'TADŽIKISTAN Republika Tadžikistan', 'TAJIKISTAN Republic of Tajikistan', 50.00, 'USD', 0),
(219, 'TAJLAND Kraljevina Tajland', 'THAILAND Kingdom of Thailand', 35.00, 'USD', 0),
(220, 'TAJVAN, KINESKA PROVINCIJA', 'TAIWAN, PROVINCE OF CHINA', 35.00, 'USD', 0),
(221, 'TANZANIJA, UJEDINJENA REPUBLIKA Ujedinjena Republika Tanzanija', 'TANZANIA, UNITED REPUBLIC OF United Republic of Tanzania', 35.00, 'USD', 0),
(222, 'TIMOR LESTE Demokratska Republika Timor Leste', 'TIMOR-LESTE Democratic Republic of Timor-Leste', 35.00, 'USD', 0),
(223, 'TOGO Republika Togo', 'TOGO Togolese Republic', 35.00, 'USD', 0),
(224, 'TOKELAU', 'TOKELAU', 35.00, 'USD', 0),
(225, 'TONGA Kraljevina Tonga', 'TONGA Kingdom of Tonga', 35.00, 'USD', 0),
(226, 'TRINIDAD I TOBAGO Republika Trinidad i Tobago', 'TRINIDAD AND TOBAGO Republic of Trinidad and Tobago', 35.00, 'USD', 0),
(227, 'TUNIS Republika Tunis', 'TUNISIA Republic of Tunisia', 35.00, 'USD', 0),
(228, 'TURKMENISTAN', 'TURKMENISTAN', 50.00, 'USD', 0),
(229, 'TURSKA Republika Turska', 'TURKEY Republic of Turkey', 50.00, 'EUR', 0),
(230, 'TUVALU', 'TUVALU', 35.00, 'USD', 0),
(231, 'UGANDA Republika Uganda', 'UGANDA Republic of Uganda', 35.00, 'USD', 0),
(232, 'UJEDINJENE DRŽAVE MANJIH PACIFIČKIH OTOKA', 'UNITED STATES MINOR OUTLYING ISLANDS', 35.00, 'USD', 0),
(233, 'UJEDINJENI ARAPSKI EMIRATI', 'UNITED ARAB EMIRATES', 50.00, 'USD', 0),
(234, 'UKRAJINA', 'UKRAINE', 50.00, 'USD', 0),
(235, 'URUGVAJ Istočna Republika Urugvaj', 'URUGUAY Eastern Republic of Uruguay', 35.00, 'USD', 0),
(236, 'UZBEKISTAN Republika Uzbekistan', 'UZBEKISTAN Republic of Uzbekistan', 50.00, 'USD', 0),
(237, 'VANUATU Republika Vanuatu', 'VANUATU Republic of Vanuatu', 35.00, 'USD', 0),
(238, 'VELIKA BRITANIJA Ujedinjena Kraljevina Velike Britanije i Sjeverne Irske', 'UNITED KINGDOM United Kingdom of Great Britain and Northern Ireland', 70.00, 'EUR', 0),
(239, 'VENEZUELA Bolivarska Republika Venezuela', 'VENEZUELA Bolivarian Republic of Venezuela', 35.00, 'USD', 0),
(240, 'VIJETNAM Socijalistička Republika Vijetnam', 'VIET NAM Socialist Republic of Viet Nam', 35.00, 'USD', 0),
(241, 'WALLIS I FUTUNA', 'WALLIS AND FUTUNA', 35.00, 'USD', 0),
(242, 'ZAMBIJA Republika Zambija', 'ZAMBIA Republic of Zambia', 35.00, 'USD', 0),
(243, 'ZAPADNA SAHARA', 'WESTERN SAHARA', 35.00, 'USD', 0),
(244, 'ZELENORTSKA REPUBLIKA', 'CAPE VERDE Republic of Cape Verde', 35.00, 'USD', 0),
(245, 'ZIMBABVE Republika Zimbabve', 'ZIMBABWE Republic of Zimbabwe', 35.00, 'USD', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `putni_nalozi_drzave`
--
ALTER TABLE `putni_nalozi_drzave`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `putni_nalozi_drzave`
--
ALTER TABLE `putni_nalozi_drzave`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=246;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
