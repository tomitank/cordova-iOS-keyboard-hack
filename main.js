		function onDeviceReady() {			

			// V1
			cordova.plugins.Keyboard.disableScroll(false);
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

			window.addEventListener('native.keyboardhide', function() {
				var input = document.querySelector(":focus");
				if (!input || input.localName != 'input') {
					window.scrollTo(0, 0);
				}
			});

			// V2
      			var content_id = null;
			cordova.plugins.Keyboard.disableScroll(true);
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

			window.addEventListener('native.keyboardhide', function() {
				$(content_id).css({'max-height': ''});
			});

			window.addEventListener('native.keyboardshow', function(e) {
				var input = document.querySelector(":focus");
				if (input)
				{
					var parent = '#'+input.offsetParent.id; // #profile

					content_id = parent+'_content'; // save content <div> id

					var title_height = $(parent+'_title').outerHeight(true); // title height

					var content_height = $(parent).outerHeight(true) - title_height - 20; // 10px padding

					var max_height = content_height - e.keyboardHeight; // new max-height..

					$(content_id).css({'max-height': max_height}); // set to content..

					var bottom = $(input).position().top + $(input).outerHeight(true);

					var scroll = Math.max(bottom - title_height - max_height, 0);

					$(content_id).stop().animate({scrollTop: scroll}, 150, function() {
						input.focus();
					});
				}
			});
		}
