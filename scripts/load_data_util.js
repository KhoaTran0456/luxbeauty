function loadData(pageName) {

	$("#header").load('components/header.html');
	$("#footer").load('components/footer.html', function () {
		$.getJSON('config_data.json', function (cgf) {


			// use for footer
			$("[name=storeName]").each(function () {
				jQuery(this).html(cgf.info.salon.store);
			});
			$("[name=storePhone]").each(function () {
				jQuery(this).html(cgf.info.salon.phone);
			});
			$("[name=storeFullAddress]").each(function () {
				jQuery(this).html(cgf.info.salon.address);
			});
			$("[name=storeDistrict]").each(function () {
				jQuery(this).html(cgf.info.salon.district);
			});
			$("[name=storeState]").each(function () {
				jQuery(this).html(cgf.info.salon.state);
			});
			$("[name=storeEmail]").each(function () {
				jQuery(this).html(cgf.info.salon.email);
			});
			$("[name=storeTime_1]").each(function () {
				jQuery(this).html(cgf.info.salon.time_1);
			});
			$("[name=storeTime_2]").each(function () {
				jQuery(this).html(cgf.info.salon.time_2);
			});
			$("[name=storeTime_3]").each(function () {
				jQuery(this).html(cgf.info.salon.time_3);
			});

			$("[data-booking]").attr('href', cgf.info.social.booking);
			$("[data-facebook]").attr('href', cgf.info.social.facebook);
			$("[data-instagram]").attr('href', cgf.info.social.instagram);
			$("[data-google]").attr('href', cgf.info.social.google);
			$("[data-maps]").attr('src', cgf.info.social.maps);
			$("[data-phone]").attr('href', "tel:" + cgf.info.salon.phone);
			$("[data-email]").attr('href', "mailto:" + cgf.info.salon.email);


			$("#storeNameAndGallery").html(cgf.info.salon.store + "- Gallery");

			if (pageName == "INDEX") {

				loadDataForIndex(cgf);
			} else if (pageName == "SERVICES") {
				loadDataForServices(cgf);
			} else if (pageName == "GALLERY") {
				loadDataForGallery(cgf);
			} else if (pageName == "SPECIALTIES") {
				loadDataForSpecialties(cgf);
			}



		})
			.fail(function () { $('body').empty().append("Error 403: Can't Load Data Website"); })
	});

}






function loadDataForIndex(cgf) {

	var srtCols = "";

	$.each(cgf.categories, function (count, cat) {

		if (cat.home == true) {
			var strColElement = '<div class="panel-heading" role="tab" id="">' +
				'									<h4 class="panel-title asd">' +
				'										<a class="pa_italic collapsed" role="button" data-toggle="collapse"' +
				'											data-parent="#accordion" href="#TARGET_SRC" aria-expanded="false"' +
				'											aria-controls="">' +
				'											CAT_NAME<span class="glyphicon glyphicon-plus" aria-hidden="true"></span><i' +
				'												class="glyphicon glyphicon-minus" aria-hidden="true"></i>' +
				'										</a>' +
				'' +		' <p class="description-tab">DESC</p>' +
				'									</h4>' +
				'								</div>' +
		
				'								<div id="TARGET_SRC" class="panel-collapse collapse" role="tabpanel" aria-labelledby=""' +
				'									aria-expanded="false" style="height: 0px;">' +
				'									<div class="panel-body panel_text">SERVICES_LIST</div>' +
				'								</div>';

			srtCols = srtCols + strColElement.replace('TARGET_SRC', cat.target).replace('CAT_NAME', cat.name).replace('DESC', cat.description).replace('TARGET_SRC', cat.target);

			var strServices = "";
			$.each(cgf.services, function (count1, srv) {
				if (srv.category == cat.name) {
					var strServiceElement = ' <div class="row">' +
						'											<div class="col-xs-9">SERVICE_NAME</div>' +
						'											<div class="col-xs-3">SERVICE_PRICE</div>' +
						'										</div>';

					strServices = strServices + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "$" + srv.price + (srv.plus ? " Up" : ""));
				}
			});
			srtCols = srtCols.replace('SERVICES_LIST', strServices);
		}

	});
	$("#servicesOfCate").html(srtCols);








}

function loadDataForServices(cgf) {


	var srtCols = "";

	$.each(cgf.categories, function (count, cat) {
		
			var strColElement = '<div class="row my-5">' +
			'                    <div class="col-sm-3 border-right-img">' +
			'                        <img src="CAT_SRC" alt="Lux Beauty">' +
			'                    </div>' +
			'                    <div class="col-sm-9 px-0">' +
			'                        <div class="row">' +
			'                            <div class="row margin-top pl-3">' +
			'                                <div class="title-big font-better text-capitalize" style="font-size:28px">CAT_NAME</div>' +
			'                            </div>' +
			'                        </div>' +
			'' +		' <p class="description">DESC</p>' +
			'                        <div class="row mt-md-3">' +
			'                             SRV_LEFT' +
			'								SRV_RIGHT' +
			'                            </div>' +
			'                    </div>' +
			'                </div>' +
			'                <div class="line-dash"></div>';



		srtCols = srtCols + strColElement.replace('CAT_SRC', "./images/" + cat.src).replace('CAT_NAME', cat.name).replace('DESC', cat.description);

		var strServices = "";
		var strServiceRight = "";
		var countCat = 0;
		$.each(cgf.services, function (count1, srv) {
			var strServiceElement = '<div class="title-small row">' +
				'                                <div class="col-xs-10 col-sm-8">SERVICE_NAME</div>' +
				'                                <div class="col-xs-2 col-sm-4 color-price pr-0">SERVICE_PRICE</div>' +
				'								</div>' +
				'								<div class="title-small row">' +
				'                                <div class="col-12 description">SERVICE_DESC</div>' +             
				'				</div>';

				if(srv.price == ""){
					if (srv.category == cat.name) {
						countCat++;
						if (countCat % 2 == 1) {
								strServices = strServices + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "");
						} else {
							strServiceRight = strServiceRight + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "");
						}
					}
				} else if(srv.price == "Price Vary"){
					if (srv.category == cat.name) {
						countCat++;
						if (countCat % 2 == 1) {
								strServices = strServices + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "Price Vary");
						} else {
							strServiceRight = strServiceRight + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "Price Vary");
						}
					}
				} else {
					if (srv.category == cat.name) {
						countCat++;
						if (countCat % 2 == 1) {
								strServices = strServices + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "$" + srv.price + (srv.plus ? "+" : "")).replace('SERVICE_DESC', srv.description);
						} else {
							strServiceRight = strServiceRight + strServiceElement.replace('SERVICE_NAME', srv.name).replace('SERVICE_PRICE', "$" + srv.price + (srv.plus ? "+" : "")).replace('SERVICE_DESC', srv.description);
						}
					}
				}
			
		});
		srtCols = srtCols.replace('SRV_LEFT', strServices);
		srtCols = srtCols.replace('SRV_RIGHT', strServiceRight);
	});
	$("#servicesOfCate").html(srtCols);



}

function loadDataForGallery(cgf) {

	var strGalleryElement = '<div class="col-md-4 w3_agile_gallery_grid">' +
		'					<div class="agile_gallery_grid">' +
		'						<div class="agile_gallery_grid1">' +
		'							<img id="gallery_image" src="IMAGE_SRC"' +
		'								alt="" class="img-responsive"' +
		'								pic_src="gallery-01">' +
		'							<div class="w3layouts_gallery_grid1_pos">' +
		'								<h3>SALON_NAME</h3>' +
		'								<p>Best Salon in Texas 75089</p>' +
		'							</div>' +
		'						</div>' +
		'					</div>' +
		'				</div>';


	var strGallery = "";
	$.each(cgf.gallery, function (count, gal) {
		var strSrc = "./images/" + gal.url;
		strGallery = strGallery + strGalleryElement.replace('IMAGE_SRC', strSrc).replace('SALON_NAME', cgf.info.salon.store);
	});
	$("#loadGallery").html(strGallery);
	// $('.w3_agile_gallery_grid a').simpleLightbox();
	/* sau khi chay xong thi moi gan hieu ung lightbox vao cho tung the a */
}

function loadDataForSpecialties(cgf) {

	var strSpecialtiesElement = '<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s">' +
		'                        <div class="team-item">' +
		'                            <div class="team-img">' +
		'                                <img src="IMAGE_SRC" alt="">' +
		'                                <div class="team-social">' +
		'                    ' +
		'                                    <a href="" data-facebook target="_blank"><i class="fab fa-facebook-f"></i></a>' +
		'                                    <a href="" data-instagram target="_blank"><i class="fab fa-instagram"></i></a>' +
		'                                    <a href="" data-google target="_blank" class="no-border"><i class="fab fa-google"></i></a>' +
		'                                </div>' +
		'                            </div>' +
		'                        </div>' +
		'                    </div>';



	var strSpecialties = "";
	$.each(cgf.specialties, function (count, spe) {
		var strSrc = "./img/" + spe.url;
		strSpecialties = strSpecialties + strSpecialtiesElement.replace('IMAGE_SRC', strSrc);

	});
	$("#loadSpecialties").html(strSpecialties);


}

