<div class="dashboard">
    <div class="modules vg-masonry-page masonry-2">
        <!-- Recent calls widget-->
        <div class="vg-box-wrapper">
            <h4>{{$t('Recent calls')}}</h4>
            <div class="vg-box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><i class="fa fa-phone"></i></th>
                            <th>{{$t('Date')}} / {{$t('Time')}}</th>
                            <th>{{$t('Caller')}}</th>
                            <th>{{$t('Destination')}}</th>
                            <th>{{$t('Duration')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5">{{$t('No calls yet')}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="vg-box-wrapper">
            <h4>{{$t('Statistics')}}</h4>
            <div class="vg-box">

            </div>
        </div>
    </div>

</div>
