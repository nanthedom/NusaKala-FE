export interface City {
    id: string
    name: string
    type: "kota" | "kabupaten"
}

export interface Province {
    id: string
    name: string
    cities: City[]
}

export const INDONESIA_DATA: Province[] = [
    {
        id: "11",
        name: "Aceh",
        cities: [
            { id: "1171", name: "Banda Aceh", type: "kota" },
            { id: "1172", name: "Sabang", type: "kota" },
            { id: "1173", name: "Langsa", type: "kota" },
            { id: "1174", name: "Lhokseumawe", type: "kota" },
            { id: "1175", name: "Subulussalam", type: "kota" },
            { id: "1101", name: "Simeulue", type: "kabupaten" },
            { id: "1102", name: "Aceh Singkil", type: "kabupaten" },
            { id: "1103", name: "Aceh Selatan", type: "kabupaten" },
            { id: "1104", name: "Aceh Tenggara", type: "kabupaten" },
            { id: "1105", name: "Aceh Timur", type: "kabupaten" },
            { id: "1106", name: "Aceh Tengah", type: "kabupaten" },
            { id: "1107", name: "Aceh Barat", type: "kabupaten" },
            { id: "1108", name: "Aceh Besar", type: "kabupaten" },
            { id: "1109", name: "Pidie", type: "kabupaten" },
            { id: "1110", name: "Bireuen", type: "kabupaten" },
            { id: "1111", name: "Aceh Utara", type: "kabupaten" },
            { id: "1112", name: "Aceh Barat Daya", type: "kabupaten" },
            { id: "1113", name: "Gayo Lues", type: "kabupaten" },
            { id: "1114", name: "Aceh Tamiang", type: "kabupaten" },
            { id: "1115", name: "Nagan Raya", type: "kabupaten" },
            { id: "1116", name: "Aceh Jaya", type: "kabupaten" },
            { id: "1117", name: "Bener Meriah", type: "kabupaten" },
            { id: "1118", name: "Pidie Jaya", type: "kabupaten" },
        ],
    },
    {
        id: "12",
        name: "Sumatera Utara",
        cities: [
            { id: "1271", name: "Sibolga", type: "kota" },
            { id: "1272", name: "Tanjung Balai", type: "kota" },
            { id: "1273", name: "Pematang Siantar", type: "kota" },
            { id: "1274", name: "Tebing Tinggi", type: "kota" },
            { id: "1275", name: "Medan", type: "kota" },
            { id: "1276", name: "Binjai", type: "kota" },
            { id: "1277", name: "Padangsidimpuan", type: "kota" },
            { id: "1278", name: "Gunungsitoli", type: "kota" },
            { id: "1201", name: "Nias", type: "kabupaten" },
            { id: "1202", name: "Mandailing Natal", type: "kabupaten" },
            { id: "1203", name: "Tapanuli Selatan", type: "kabupaten" },
            { id: "1204", name: "Tapanuli Tengah", type: "kabupaten" },
            { id: "1205", name: "Tapanuli Utara", type: "kabupaten" },
            { id: "1206", name: "Toba Samosir", type: "kabupaten" },
            { id: "1207", name: "Labuhan Batu", type: "kabupaten" },
            { id: "1208", name: "Asahan", type: "kabupaten" },
            { id: "1209", name: "Simalungun", type: "kabupaten" },
            { id: "1210", name: "Dairi", type: "kabupaten" },
            { id: "1211", name: "Karo", type: "kabupaten" },
            { id: "1212", name: "Deli Serdang", type: "kabupaten" },
            { id: "1213", name: "Langkat", type: "kabupaten" },
            { id: "1214", name: "Nias Selatan", type: "kabupaten" },
            { id: "1215", name: "Humbang Hasundutan", type: "kabupaten" },
            { id: "1216", name: "Pakpak Bharat", type: "kabupaten" },
            { id: "1217", name: "Samosir", type: "kabupaten" },
            { id: "1218", name: "Serdang Bedagai", type: "kabupaten" },
            { id: "1219", name: "Batu Bara", type: "kabupaten" },
            { id: "1220", name: "Padang Lawas Utara", type: "kabupaten" },
            { id: "1221", name: "Padang Lawas", type: "kabupaten" },
            { id: "1222", name: "Labuhan Batu Selatan", type: "kabupaten" },
            { id: "1223", name: "Labuhan Batu Utara", type: "kabupaten" },
            { id: "1224", name: "Nias Utara", type: "kabupaten" },
            { id: "1225", name: "Nias Barat", type: "kabupaten" },
        ],
    },
    {
        id: "13",
        name: "Sumatera Barat",
        cities: [
            { id: "1371", name: "Padang", type: "kota" },
            { id: "1372", name: "Solok", type: "kota" },
            { id: "1373", name: "Sawah Lunto", type: "kota" },
            { id: "1374", name: "Padang Panjang", type: "kota" },
            { id: "1375", name: "Bukittinggi", type: "kota" },
            { id: "1376", name: "Payakumbuh", type: "kota" },
            { id: "1377", name: "Pariaman", type: "kota" },
            { id: "1301", name: "Kepulauan Mentawai", type: "kabupaten" },
            { id: "1302", name: "Pesisir Selatan", type: "kabupaten" },
            { id: "1303", name: "Solok", type: "kabupaten" },
            { id: "1304", name: "Sijunjung", type: "kabupaten" },
            { id: "1305", name: "Tanah Datar", type: "kabupaten" },
            { id: "1306", name: "Padang Pariaman", type: "kabupaten" },
            { id: "1307", name: "Agam", type: "kabupaten" },
            { id: "1308", name: "Lima Puluh Kota", type: "kabupaten" },
            { id: "1309", name: "Pasaman", type: "kabupaten" },
            { id: "1310", name: "Solok Selatan", type: "kabupaten" },
            { id: "1311", name: "Dharmasraya", type: "kabupaten" },
            { id: "1312", name: "Pasaman Barat", type: "kabupaten" },
        ],
    },
    {
        id: "14",
        name: "Riau",
        cities: [
            { id: "1471", name: "Pekanbaru", type: "kota" },
            { id: "1473", name: "Dumai", type: "kota" },
            { id: "1401", name: "Kuantan Singingi", type: "kabupaten" },
            { id: "1402", name: "Indragiri Hulu", type: "kabupaten" },
            { id: "1403", name: "Indragiri Hilir", type: "kabupaten" },
            { id: "1404", name: "Pelalawan", type: "kabupaten" },
            { id: "1405", name: "Siak", type: "kabupaten" },
            { id: "1406", name: "Kampar", type: "kabupaten" },
            { id: "1407", name: "Rokan Hulu", type: "kabupaten" },
            { id: "1408", name: "Bengkalis", type: "kabupaten" },
            { id: "1409", name: "Rokan Hilir", type: "kabupaten" },
            { id: "1410", name: "Kepulauan Meranti", type: "kabupaten" },
        ],
    },
    {
        id: "15",
        name: "Jambi",
        cities: [
            { id: "1571", name: "Jambi", type: "kota" },
            { id: "1572", name: "Sungai Penuh", type: "kota" },
            { id: "1501", name: "Kerinci", type: "kabupaten" },
            { id: "1502", name: "Merangin", type: "kabupaten" },
            { id: "1503", name: "Sarolangun", type: "kabupaten" },
            { id: "1504", name: "Batang Hari", type: "kabupaten" },
            { id: "1505", name: "Muaro Jambi", type: "kabupaten" },
            { id: "1506", name: "Tanjung Jabung Timur", type: "kabupaten" },
            { id: "1507", name: "Tanjung Jabung Barat", type: "kabupaten" },
            { id: "1508", name: "Tebo", type: "kabupaten" },
            { id: "1509", name: "Bungo", type: "kabupaten" },
        ],
    },
    {
        id: "16",
        name: "Sumatera Selatan",
        cities: [
            { id: "1671", name: "Palembang", type: "kota" },
            { id: "1672", name: "Prabumulih", type: "kota" },
            { id: "1673", name: "Pagar Alam", type: "kota" },
            { id: "1674", name: "Lubuklinggau", type: "kota" },
            { id: "1601", name: "Ogan Komering Ulu", type: "kabupaten" },
            { id: "1602", name: "Ogan Komering Ilir", type: "kabupaten" },
            { id: "1603", name: "Muara Enim", type: "kabupaten" },
            { id: "1604", name: "Lahat", type: "kabupaten" },
            { id: "1605", name: "Musi Rawas", type: "kabupaten" },
            { id: "1606", name: "Musi Banyuasin", type: "kabupaten" },
            { id: "1607", name: "Banyu Asin", type: "kabupaten" },
            { id: "1608", name: "Ogan Komering Ulu Selatan", type: "kabupaten" },
            { id: "1609", name: "Ogan Komering Ulu Timur", type: "kabupaten" },
            { id: "1610", name: "Ogan Ilir", type: "kabupaten" },
            { id: "1611", name: "Empat Lawang", type: "kabupaten" },
            { id: "1612", name: "Penukal Abab Lematang Ilir", type: "kabupaten" },
            { id: "1613", name: "Musi Rawas Utara", type: "kabupaten" },
        ],
    },
    {
        id: "17",
        name: "Bengkulu",
        cities: [
            { id: "1771", name: "Bengkulu", type: "kota" },
            { id: "1701", name: "Bengkulu Selatan", type: "kabupaten" },
            { id: "1702", name: "Rejang Lebong", type: "kabupaten" },
            { id: "1703", name: "Bengkulu Utara", type: "kabupaten" },
            { id: "1704", name: "Kaur", type: "kabupaten" },
            { id: "1705", name: "Seluma", type: "kabupaten" },
            { id: "1706", name: "Mukomuko", type: "kabupaten" },
            { id: "1707", name: "Lebong", type: "kabupaten" },
            { id: "1708", name: "Kepahiang", type: "kabupaten" },
            { id: "1709", name: "Bengkulu Tengah", type: "kabupaten" },
        ],
    },
    {
        id: "18",
        name: "Lampung",
        cities: [
            { id: "1871", name: "Bandar Lampung", type: "kota" },
            { id: "1872", name: "Metro", type: "kota" },
            { id: "1801", name: "Lampung Barat", type: "kabupaten" },
            { id: "1802", name: "Tanggamus", type: "kabupaten" },
            { id: "1803", name: "Lampung Selatan", type: "kabupaten" },
            { id: "1804", name: "Lampung Timur", type: "kabupaten" },
            { id: "1805", name: "Lampung Tengah", type: "kabupaten" },
            { id: "1806", name: "Lampung Utara", type: "kabupaten" },
            { id: "1807", name: "Way Kanan", type: "kabupaten" },
            { id: "1808", name: "Tulangbawang", type: "kabupaten" },
            { id: "1809", name: "Pesawaran", type: "kabupaten" },
            { id: "1810", name: "Pringsewu", type: "kabupaten" },
            { id: "1811", name: "Mesuji", type: "kabupaten" },
            { id: "1812", name: "Tulang Bawang Barat", type: "kabupaten" },
            { id: "1813", name: "Pesisir Barat", type: "kabupaten" },
        ],
    },
    {
        id: "19",
        name: "Kepulauan Bangka Belitung",
        cities: [
            { id: "1971", name: "Pangkal Pinang", type: "kota" },
            { id: "1901", name: "Bangka", type: "kabupaten" },
            { id: "1902", name: "Belitung", type: "kabupaten" },
            { id: "1903", name: "Bangka Barat", type: "kabupaten" },
            { id: "1904", name: "Bangka Tengah", type: "kabupaten" },
            { id: "1905", name: "Bangka Selatan", type: "kabupaten" },
            { id: "1906", name: "Belitung Timur", type: "kabupaten" },
        ],
    },
    {
        id: "21",
        name: "Kepulauan Riau",
        cities: [
            { id: "2171", name: "Batam", type: "kota" },
            { id: "2172", name: "Tanjung Pinang", type: "kota" },
            { id: "2101", name: "Karimun", type: "kabupaten" },
            { id: "2102", name: "Bintan", type: "kabupaten" },
            { id: "2103", name: "Natuna", type: "kabupaten" },
            { id: "2104", name: "Lingga", type: "kabupaten" },
            { id: "2105", name: "Kepulauan Anambas", type: "kabupaten" },
        ],
    },
    {
        id: "31",
        name: "DKI Jakarta",
        cities: [
            { id: "3171", name: "Jakarta Selatan", type: "kota" },
            { id: "3172", name: "Jakarta Timur", type: "kota" },
            { id: "3173", name: "Jakarta Pusat", type: "kota" },
            { id: "3174", name: "Jakarta Barat", type: "kota" },
            { id: "3175", name: "Jakarta Utara", type: "kota" },
            { id: "3101", name: "Kepulauan Seribu", type: "kabupaten" },
        ],
    },
    {
        id: "32",
        name: "Jawa Barat",
        cities: [
            { id: "3271", name: "Bogor", type: "kota" },
            { id: "3272", name: "Sukabumi", type: "kota" },
            { id: "3273", name: "Bandung", type: "kota" },
            { id: "3274", name: "Cirebon", type: "kota" },
            { id: "3275", name: "Bekasi", type: "kota" },
            { id: "3276", name: "Depok", type: "kota" },
            { id: "3277", name: "Cimahi", type: "kota" },
            { id: "3278", name: "Tasikmalaya", type: "kota" },
            { id: "3279", name: "Banjar", type: "kota" },
            { id: "3201", name: "Bogor", type: "kabupaten" },
            { id: "3202", name: "Sukabumi", type: "kabupaten" },
            { id: "3203", name: "Cianjur", type: "kabupaten" },
            { id: "3204", name: "Bandung", type: "kabupaten" },
            { id: "3205", name: "Garut", type: "kabupaten" },
            { id: "3206", name: "Tasikmalaya", type: "kabupaten" },
            { id: "3207", name: "Ciamis", type: "kabupaten" },
            { id: "3208", name: "Kuningan", type: "kabupaten" },
            { id: "3209", name: "Cirebon", type: "kabupaten" },
            { id: "3210", name: "Majalengka", type: "kabupaten" },
            { id: "3211", name: "Sumedang", type: "kabupaten" },
            { id: "3212", name: "Indramayu", type: "kabupaten" },
            { id: "3213", name: "Subang", type: "kabupaten" },
            { id: "3214", name: "Purwakarta", type: "kabupaten" },
            { id: "3215", name: "Karawang", type: "kabupaten" },
            { id: "3216", name: "Bekasi", type: "kabupaten" },
            { id: "3217", name: "Bandung Barat", type: "kabupaten" },
            { id: "3218", name: "Pangandaran", type: "kabupaten" },
        ],
    },
    {
        id: "33",
        name: "Jawa Tengah",
        cities: [
            { id: "3371", name: "Magelang", type: "kota" },
            { id: "3372", name: "Surakarta", type: "kota" },
            { id: "3373", name: "Salatiga", type: "kota" },
            { id: "3374", name: "Semarang", type: "kota" },
            { id: "3375", name: "Pekalongan", type: "kota" },
            { id: "3376", name: "Tegal", type: "kota" },
            { id: "3301", name: "Cilacap", type: "kabupaten" },
            { id: "3302", name: "Banyumas", type: "kabupaten" },
            { id: "3303", name: "Purbalingga", type: "kabupaten" },
            { id: "3304", name: "Banjarnegara", type: "kabupaten" },
            { id: "3305", name: "Kebumen", type: "kabupaten" },
            { id: "3306", name: "Purworejo", type: "kabupaten" },
            { id: "3307", name: "Wonosobo", type: "kabupaten" },
            { id: "3308", name: "Magelang", type: "kabupaten" },
            { id: "3309", name: "Boyolali", type: "kabupaten" },
            { id: "3310", name: "Klaten", type: "kabupaten" },
            { id: "3311", name: "Sukoharjo", type: "kabupaten" },
            { id: "3312", name: "Wonogiri", type: "kabupaten" },
            { id: "3313", name: "Karanganyar", type: "kabupaten" },
            { id: "3314", name: "Sragen", type: "kabupaten" },
            { id: "3315", name: "Grobogan", type: "kabupaten" },
            { id: "3316", name: "Blora", type: "kabupaten" },
            { id: "3317", name: "Rembang", type: "kabupaten" },
            { id: "3318", name: "Pati", type: "kabupaten" },
            { id: "3319", name: "Kudus", type: "kabupaten" },
            { id: "3320", name: "Jepara", type: "kabupaten" },
            { id: "3321", name: "Demak", type: "kabupaten" },
            { id: "3322", name: "Semarang", type: "kabupaten" },
            { id: "3323", name: "Temanggung", type: "kabupaten" },
            { id: "3324", name: "Kendal", type: "kabupaten" },
            { id: "3325", name: "Batang", type: "kabupaten" },
            { id: "3326", name: "Pekalongan", type: "kabupaten" },
            { id: "3327", name: "Pemalang", type: "kabupaten" },
            { id: "3328", name: "Tegal", type: "kabupaten" },
            { id: "3329", name: "Brebes", type: "kabupaten" },
        ],
    },
    {
        id: "34",
        name: "DI Yogyakarta",
        cities: [
            { id: "3471", name: "Yogyakarta", type: "kota" },
            { id: "3401", name: "Kulon Progo", type: "kabupaten" },
            { id: "3402", name: "Bantul", type: "kabupaten" },
            { id: "3403", name: "Gunung Kidul", type: "kabupaten" },
            { id: "3404", name: "Sleman", type: "kabupaten" },
        ],
    },
    {
        id: "35",
        name: "Jawa Timur",
        cities: [
            { id: "3571", name: "Kediri", type: "kota" },
            { id: "3572", name: "Blitar", type: "kota" },
            { id: "3573", name: "Malang", type: "kota" },
            { id: "3574", name: "Probolinggo", type: "kota" },
            { id: "3575", name: "Pasuruan", type: "kota" },
            { id: "3576", name: "Mojokerto", type: "kota" },
            { id: "3577", name: "Madiun", type: "kota" },
            { id: "3578", name: "Surabaya", type: "kota" },
            { id: "3579", name: "Batu", type: "kota" },
            { id: "3501", name: "Pacitan", type: "kabupaten" },
            { id: "3502", name: "Ponorogo", type: "kabupaten" },
            { id: "3503", name: "Trenggalek", type: "kabupaten" },
            { id: "3504", name: "Tulungagung", type: "kabupaten" },
            { id: "3505", name: "Blitar", type: "kabupaten" },
            { id: "3506", name: "Kediri", type: "kabupaten" },
            { id: "3507", name: "Malang", type: "kabupaten" },
            { id: "3508", name: "Lumajang", type: "kabupaten" },
            { id: "3509", name: "Jember", type: "kabupaten" },
            { id: "3510", name: "Banyuwangi", type: "kabupaten" },
            { id: "3511", name: "Bondowoso", type: "kabupaten" },
            { id: "3512", name: "Situbondo", type: "kabupaten" },
            { id: "3513", name: "Probolinggo", type: "kabupaten" },
            { id: "3514", name: "Pasuruan", type: "kabupaten" },
            { id: "3515", name: "Sidoarjo", type: "kabupaten" },
            { id: "3516", name: "Mojokerto", type: "kabupaten" },
            { id: "3517", name: "Jombang", type: "kabupaten" },
            { id: "3518", name: "Nganjuk", type: "kabupaten" },
            { id: "3519", name: "Madiun", type: "kabupaten" },
            { id: "3520", name: "Magetan", type: "kabupaten" },
            { id: "3521", name: "Ngawi", type: "kabupaten" },
            { id: "3522", name: "Bojonegoro", type: "kabupaten" },
            { id: "3523", name: "Tuban", type: "kabupaten" },
            { id: "3524", name: "Lamongan", type: "kabupaten" },
            { id: "3525", name: "Gresik", type: "kabupaten" },
            { id: "3526", name: "Bangkalan", type: "kabupaten" },
            { id: "3527", name: "Sampang", type: "kabupaten" },
            { id: "3528", name: "Pamekasan", type: "kabupaten" },
            { id: "3529", name: "Sumenep", type: "kabupaten" },
        ],
    },
    {
        id: "36",
        name: "Banten",
        cities: [
            { id: "3671", name: "Tangerang", type: "kota" },
            { id: "3672", name: "Cilegon", type: "kota" },
            { id: "3673", name: "Serang", type: "kota" },
            { id: "3674", name: "Tangerang Selatan", type: "kota" },
            { id: "3601", name: "Pandeglang", type: "kabupaten" },
            { id: "3602", name: "Lebak", type: "kabupaten" },
            { id: "3603", name: "Tangerang", type: "kabupaten" },
            { id: "3604", name: "Serang", type: "kabupaten" },
        ],
    },
    {
        id: "51",
        name: "Bali",
        cities: [
            { id: "5171", name: "Denpasar", type: "kota" },
            { id: "5101", name: "Jembrana", type: "kabupaten" },
            { id: "5102", name: "Tabanan", type: "kabupaten" },
            { id: "5103", name: "Badung", type: "kabupaten" },
            { id: "5104", name: "Gianyar", type: "kabupaten" },
            { id: "5105", name: "Klungkung", type: "kabupaten" },
            { id: "5106", name: "Bangli", type: "kabupaten" },
            { id: "5107", name: "Karangasem", type: "kabupaten" },
            { id: "5108", name: "Buleleng", type: "kabupaten" },
        ],
    },
    {
        id: "52",
        name: "Nusa Tenggara Barat",
        cities: [
            { id: "5271", name: "Mataram", type: "kota" },
            { id: "5272", name: "Bima", type: "kota" },
            { id: "5201", name: "Lombok Barat", type: "kabupaten" },
            { id: "5202", name: "Lombok Tengah", type: "kabupaten" },
            { id: "5203", name: "Lombok Timur", type: "kabupaten" },
            { id: "5204", name: "Sumbawa", type: "kabupaten" },
            { id: "5205", name: "Dompu", type: "kabupaten" },
            { id: "5206", name: "Bima", type: "kabupaten" },
            { id: "5207", name: "Sumbawa Barat", type: "kabupaten" },
            { id: "5208", name: "Lombok Utara", type: "kabupaten" },
        ],
    },
    {
        id: "53",
        name: "Nusa Tenggara Timur",
        cities: [
            { id: "5371", name: "Kupang", type: "kota" },
            { id: "5301", name: "Sumba Barat", type: "kabupaten" },
            { id: "5302", name: "Sumba Timur", type: "kabupaten" },
            { id: "5303", name: "Kupang", type: "kabupaten" },
            { id: "5304", name: "Timor Tengah Selatan", type: "kabupaten" },
            { id: "5305", name: "Timor Tengah Utara", type: "kabupaten" },
            { id: "5306", name: "Belu", type: "kabupaten" },
            { id: "5307", name: "Alor", type: "kabupaten" },
            { id: "5308", name: "Lembata", type: "kabupaten" },
            { id: "5309", name: "Flores Timur", type: "kabupaten" },
            { id: "5310", name: "Sikka", type: "kabupaten" },
            { id: "5311", name: "Ende", type: "kabupaten" },
            { id: "5312", name: "Ngada", type: "kabupaten" },
            { id: "5313", name: "Manggarai", type: "kabupaten" },
            { id: "5314", name: "Rote Ndao", type: "kabupaten" },
            { id: "5315", name: "Manggarai Barat", type: "kabupaten" },
            { id: "5316", name: "Sumba Tengah", type: "kabupaten" },
            { id: "5317", name: "Sumba Barat Daya", type: "kabupaten" },
            { id: "5318", name: "Nagekeo", type: "kabupaten" },
            { id: "5319", name: "Manggarai Timur", type: "kabupaten" },
            { id: "5320", name: "Sabu Raijua", type: "kabupaten" },
            { id: "5321", name: "Malaka", type: "kabupaten" },
        ],
    },
    {
        id: "61",
        name: "Kalimantan Barat",
        cities: [
            { id: "6171", name: "Pontianak", type: "kota" },
            { id: "6172", name: "Singkawang", type: "kota" },
            { id: "6101", name: "Sambas", type: "kabupaten" },
            { id: "6102", name: "Bengkayang", type: "kabupaten" },
            { id: "6103", name: "Landak", type: "kabupaten" },
            { id: "6104", name: "Mempawah", type: "kabupaten" },
            { id: "6105", name: "Sanggau", type: "kabupaten" },
            { id: "6106", name: "Ketapang", type: "kabupaten" },
            { id: "6107", name: "Sintang", type: "kabupaten" },
            { id: "6108", name: "Kapuas Hulu", type: "kabupaten" },
            { id: "6109", name: "Sekadau", type: "kabupaten" },
            { id: "6110", name: "Melawi", type: "kabupaten" },
            { id: "6111", name: "Kayong Utara", type: "kabupaten" },
            { id: "6112", name: "Kubu Raya", type: "kabupaten" },
        ],
    },
    {
        id: "62",
        name: "Kalimantan Tengah",
        cities: [
            { id: "6271", name: "Palangka Raya", type: "kota" },
            { id: "6201", name: "Kotawaringin Barat", type: "kabupaten" },
            { id: "6202", name: "Kotawaringin Timur", type: "kabupaten" },
            { id: "6203", name: "Kapuas", type: "kabupaten" },
            { id: "6204", name: "Barito Selatan", type: "kabupaten" },
            { id: "6205", name: "Barito Utara", type: "kabupaten" },
            { id: "6206", name: "Sukamara", type: "kabupaten" },
            { id: "6207", name: "Lamandau", type: "kabupaten" },
            { id: "6208", name: "Seruyan", type: "kabupaten" },
            { id: "6209", name: "Katingan", type: "kabupaten" },
            { id: "6210", name: "Pulang Pisau", type: "kabupaten" },
            { id: "6211", name: "Gunung Mas", type: "kabupaten" },
            { id: "6212", name: "Barito Timur", type: "kabupaten" },
            { id: "6213", name: "Murung Raya", type: "kabupaten" },
        ],
    },
    {
        id: "63",
        name: "Kalimantan Selatan",
        cities: [
            { id: "6371", name: "Banjarmasin", type: "kota" },
            { id: "6372", name: "Banjarbaru", type: "kota" },
            { id: "6301", name: "Tanah Laut", type: "kabupaten" },
            { id: "6302", name: "Kota Baru", type: "kabupaten" },
            { id: "6303", name: "Banjar", type: "kabupaten" },
            { id: "6304", name: "Barito Kuala", type: "kabupaten" },
            { id: "6305", name: "Tapin", type: "kabupaten" },
            { id: "6306", name: "Hulu Sungai Selatan", type: "kabupaten" },
            { id: "6307", name: "Hulu Sungai Tengah", type: "kabupaten" },
            { id: "6308", name: "Hulu Sungai Utara", type: "kabupaten" },
            { id: "6309", name: "Tabalong", type: "kabupaten" },
            { id: "6310", name: "Tanah Bumbu", type: "kabupaten" },
            { id: "6311", name: "Balangan", type: "kabupaten" },
        ],
    },
    {
        id: "64",
        name: "Kalimantan Timur",
        cities: [
            { id: "6471", name: "Samarinda", type: "kota" },
            { id: "6472", name: "Balikpapan", type: "kota" },
            { id: "6474", name: "Bontang", type: "kota" },
            { id: "6401", name: "Paser", type: "kabupaten" },
            { id: "6402", name: "Kutai Barat", type: "kabupaten" },
            { id: "6403", name: "Kutai Kartanegara", type: "kabupaten" },
            { id: "6404", name: "Kutai Timur", type: "kabupaten" },
            { id: "6405", name: "Berau", type: "kabupaten" },
            { id: "6409", name: "Penajam Paser Utara", type: "kabupaten" },
            { id: "6411", name: "Mahakam Ulu", type: "kabupaten" },
        ],
    },
    {
        id: "65",
        name: "Kalimantan Utara",
        cities: [
            { id: "6571", name: "Tarakan", type: "kota" },
            { id: "6501", name: "Malinau", type: "kabupaten" },
            { id: "6502", name: "Bulungan", type: "kabupaten" },
            { id: "6503", name: "Tana Tidung", type: "kabupaten" },
            { id: "6504", name: "Nunukan", type: "kabupaten" },
        ],
    },
    {
        id: "71",
        name: "Sulawesi Utara",
        cities: [
            { id: "7171", name: "Manado", type: "kota" },
            { id: "7172", name: "Bitung", type: "kota" },
            { id: "7173", name: "Tomohon", type: "kota" },
            { id: "7174", name: "Kotamobagu", type: "kota" },
            { id: "7101", name: "Bolaang Mongondow", type: "kabupaten" },
            { id: "7102", name: "Minahasa", type: "kabupaten" },
            { id: "7103", name: "Kepulauan Sangihe", type: "kabupaten" },
            { id: "7104", name: "Kepulauan Talaud", type: "kabupaten" },
            { id: "7105", name: "Minahasa Selatan", type: "kabupaten" },
            { id: "7106", name: "Minahasa Utara", type: "kabupaten" },
            { id: "7107", name: "Bolaang Mongondow Utara", type: "kabupaten" },
            { id: "7108", name: "Siau Tagulandang Biaro", type: "kabupaten" },
            { id: "7109", name: "Minahasa Tenggara", type: "kabupaten" },
            { id: "7110", name: "Bolaang Mongondow Selatan", type: "kabupaten" },
            { id: "7111", name: "Bolaang Mongondow Timur", type: "kabupaten" },
        ],
    },
    {
        id: "72",
        name: "Sulawesi Tengah",
        cities: [
            { id: "7271", name: "Palu", type: "kota" },
            { id: "7201", name: "Banggai Kepulauan", type: "kabupaten" },
            { id: "7202", name: "Banggai", type: "kabupaten" },
            { id: "7203", name: "Morowali", type: "kabupaten" },
            { id: "7204", name: "Poso", type: "kabupaten" },
            { id: "7205", name: "Donggala", type: "kabupaten" },
            { id: "7206", name: "Toli-Toli", type: "kabupaten" },
            { id: "7207", name: "Buol", type: "kabupaten" },
            { id: "7208", name: "Parigi Moutong", type: "kabupaten" },
            { id: "7209", name: "Tojo Una-Una", type: "kabupaten" },
            { id: "7210", name: "Sigi", type: "kabupaten" },
            { id: "7211", name: "Banggai Laut", type: "kabupaten" },
            { id: "7212", name: "Morowali Utara", type: "kabupaten" },
        ],
    },
    {
        id: "73",
        name: "Sulawesi Selatan",
        cities: [
            { id: "7371", name: "Makassar", type: "kota" },
            { id: "7372", name: "Parepare", type: "kota" },
            { id: "7373", name: "Palopo", type: "kota" },
            { id: "7301", name: "Kepulauan Selayar", type: "kabupaten" },
            { id: "7302", name: "Bulukumba", type: "kabupaten" },
            { id: "7303", name: "Bantaeng", type: "kabupaten" },
            { id: "7304", name: "Jeneponto", type: "kabupaten" },
            { id: "7305", name: "Takalar", type: "kabupaten" },
            { id: "7306", name: "Gowa", type: "kabupaten" },
            { id: "7307", name: "Sinjai", type: "kabupaten" },
            { id: "7308", name: "Maros", type: "kabupaten" },
            { id: "7309", name: "Pangkajene dan Kepulauan", type: "kabupaten" },
            { id: "7310", name: "Barru", type: "kabupaten" },
            { id: "7311", name: "Bone", type: "kabupaten" },
            { id: "7312", name: "Soppeng", type: "kabupaten" },
            { id: "7313", name: "Wajo", type: "kabupaten" },
            { id: "7314", name: "Sidenreng Rappang", type: "kabupaten" },
            { id: "7315", name: "Pinrang", type: "kabupaten" },
            { id: "7316", name: "Enrekang", type: "kabupaten" },
            { id: "7317", name: "Luwu", type: "kabupaten" },
            { id: "7318", name: "Tana Toraja", type: "kabupaten" },
            { id: "7322", name: "Luwu Utara", type: "kabupaten" },
            { id: "7325", name: "Luwu Timur", type: "kabupaten" },
            { id: "7326", name: "Toraja Utara", type: "kabupaten" },
        ],
    },
    {
        id: "74",
        name: "Sulawesi Tenggara",
        cities: [
            { id: "7471", name: "Kendari", type: "kota" },
            { id: "7472", name: "Baubau", type: "kota" },
            { id: "7401", name: "Buton", type: "kabupaten" },
            { id: "7402", name: "Muna", type: "kabupaten" },
            { id: "7403", name: "Konawe", type: "kabupaten" },
            { id: "7404", name: "Kolaka", type: "kabupaten" },
            { id: "7405", name: "Konawe Selatan", type: "kabupaten" },
            { id: "7406", name: "Bombana", type: "kabupaten" },
            { id: "7407", name: "Wakatobi", type: "kabupaten" },
            { id: "7408", name: "Kolaka Utara", type: "kabupaten" },
            { id: "7409", name: "Buton Utara", type: "kabupaten" },
            { id: "7410", name: "Konawe Utara", type: "kabupaten" },
            { id: "7411", name: "Kolaka Timur", type: "kabupaten" },
            { id: "7412", name: "Konawe Kepulauan", type: "kabupaten" },
            { id: "7413", name: "Muna Barat", type: "kabupaten" },
            { id: "7414", name: "Buton Tengah", type: "kabupaten" },
            { id: "7415", name: "Buton Selatan", type: "kabupaten" },
        ],
    },
    {
        id: "75",
        name: "Gorontalo",
        cities: [
            { id: "7571", name: "Gorontalo", type: "kota" },
            { id: "7501", name: "Boalemo", type: "kabupaten" },
            { id: "7502", name: "Gorontalo", type: "kabupaten" },
            { id: "7503", name: "Pohuwato", type: "kabupaten" },
            { id: "7504", name: "Bone Bolango", type: "kabupaten" },
            { id: "7505", name: "Gorontalo Utara", type: "kabupaten" },
        ],
    },
    {
        id: "76",
        name: "Sulawesi Barat",
        cities: [
            { id: "7601", name: "Majene", type: "kabupaten" },
            { id: "7602", name: "Polewali Mandar", type: "kabupaten" },
            { id: "7603", name: "Mamasa", type: "kabupaten" },
            { id: "7604", name: "Mamuju", type: "kabupaten" },
            { id: "7605", name: "Mamuju Utara", type: "kabupaten" },
            { id: "7606", name: "Mamuju Tengah", type: "kabupaten" },
        ],
    },
    {
        id: "81",
        name: "Maluku",
        cities: [
            { id: "8171", name: "Ambon", type: "kota" },
            { id: "8172", name: "Tual", type: "kota" },
            { id: "8101", name: "Maluku Tenggara Barat", type: "kabupaten" },
            { id: "8102", name: "Maluku Tenggara", type: "kabupaten" },
            { id: "8103", name: "Maluku Tengah", type: "kabupaten" },
            { id: "8104", name: "Buru", type: "kabupaten" },
            { id: "8105", name: "Kepulauan Aru", type: "kabupaten" },
            { id: "8106", name: "Seram Bagian Barat", type: "kabupaten" },
            { id: "8107", name: "Seram Bagian Timur", type: "kabupaten" },
            { id: "8108", name: "Maluku Barat Daya", type: "kabupaten" },
            { id: "8109", name: "Buru Selatan", type: "kabupaten" },
        ],
    },
    {
        id: "82",
        name: "Maluku Utara",
        cities: [
            { id: "8271", name: "Ternate", type: "kota" },
            { id: "8272", name: "Tidore Kepulauan", type: "kota" },
            { id: "8201", name: "Halmahera Barat", type: "kabupaten" },
            { id: "8202", name: "Halmahera Tengah", type: "kabupaten" },
            { id: "8203", name: "Kepulauan Sula", type: "kabupaten" },
            { id: "8204", name: "Halmahera Selatan", type: "kabupaten" },
            { id: "8205", name: "Halmahera Utara", type: "kabupaten" },
            { id: "8206", name: "Halmahera Timur", type: "kabupaten" },
            { id: "8207", name: "Pulau Morotai", type: "kabupaten" },
            { id: "8208", name: "Pulau Taliabu", type: "kabupaten" },
        ],
    },
    {
        id: "91",
        name: "Papua Barat",
        cities: [
            { id: "9171", name: "Sorong", type: "kota" },
            { id: "9101", name: "Fakfak", type: "kabupaten" },
            { id: "9102", name: "Kaimana", type: "kabupaten" },
            { id: "9103", name: "Teluk Wondama", type: "kabupaten" },
            { id: "9104", name: "Teluk Bintuni", type: "kabupaten" },
            { id: "9105", name: "Manokwari", type: "kabupaten" },
            { id: "9106", name: "Sorong Selatan", type: "kabupaten" },
            { id: "9107", name: "Sorong", type: "kabupaten" },
            { id: "9108", name: "Raja Ampat", type: "kabupaten" },
            { id: "9109", name: "Tambrauw", type: "kabupaten" },
            { id: "9110", name: "Maybrat", type: "kabupaten" },
            { id: "9111", name: "Manokwari Selatan", type: "kabupaten" },
            { id: "9112", name: "Pegunungan Arfak", type: "kabupaten" },
        ],
    },
    {
        id: "94",
        name: "Papua",
        cities: [
            { id: "9471", name: "Jayapura", type: "kota" },
            { id: "9401", name: "Merauke", type: "kabupaten" },
            { id: "9402", name: "Jayawijaya", type: "kabupaten" },
            { id: "9403", name: "Jayapura", type: "kabupaten" },
            { id: "9404", name: "Nabire", type: "kabupaten" },
            { id: "9408", name: "Kepulauan Yapen", type: "kabupaten" },
            { id: "9409", name: "Biak Numfor", type: "kabupaten" },
            { id: "9410", name: "Paniai", type: "kabupaten" },
            { id: "9411", name: "Puncak Jaya", type: "kabupaten" },
            { id: "9412", name: "Mimika", type: "kabupaten" },
            { id: "9413", name: "Boven Digoel", type: "kabupaten" },
            { id: "9414", name: "Mappi", type: "kabupaten" },
            { id: "9415", name: "Asmat", type: "kabupaten" },
            { id: "9416", name: "Yahukimo", type: "kabupaten" },
            { id: "9417", name: "Pegunungan Bintang", type: "kabupaten" },
            { id: "9418", name: "Tolikara", type: "kabupaten" },
            { id: "9419", name: "Sarmi", type: "kabupaten" },
            { id: "9420", name: "Keerom", type: "kabupaten" },
            { id: "9426", name: "Waropen", type: "kabupaten" },
            { id: "9427", name: "Supiori", type: "kabupaten" },
            { id: "9428", name: "Mamberamo Raya", type: "kabupaten" },
            { id: "9429", name: "Nduga", type: "kabupaten" },
            { id: "9430", name: "Lanny Jaya", type: "kabupaten" },
            { id: "9431", name: "Mamberamo Tengah", type: "kabupaten" },
            { id: "9432", name: "Yalimo", type: "kabupaten" },
            { id: "9433", name: "Puncak", type: "kabupaten" },
            { id: "9434", name: "Dogiyai", type: "kabupaten" },
            { id: "9435", name: "Intan Jaya", type: "kabupaten" },
            { id: "9436", name: "Deiyai", type: "kabupaten" },
        ],
    },
]
